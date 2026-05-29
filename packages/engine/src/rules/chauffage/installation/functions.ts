import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment, Chauffage } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as ChauffageRule from "#rules/chauffage/functions.js";
import * as EnveloppeRule from "#rules/enveloppe/functions.js";
import * as SystemeRule from "#rules/chauffage/systeme/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { createParMois, type NonEmptyArray } from "#utils/helpers.js";

/**
 * @param props.bch : {@linkcode ChauffageRule.calcule_bch}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @returns Besoins de chauffage proratisés à l'installation en kWh/mois
 */
export function calcule_bch(props: {
	bch: Common.ParMois<number>;
	rdim: number;
}): Common.ParMois<number> {
	const { rdim } = props;
	return createParMois((mois) => props.bch[mois] * rdim);
}

/**
 * @param props.surface_installation - Surface de l'installation de chauffage en m²
 * @param props.surface_installations - Surface totale des installations de chauffage en m²
 * @returns Ratio de dimensionnement de l'installation de chauffage
 */
export function calcule_rdim(props: {
	surface_installation: number;
	surface_installations: number;
}): number {
	const { surface_installation, surface_installations } = props;
	return surface_installation / surface_installations;
}

export type Configuration = {
	base: number;
	releve: number;
	appoint: number;
};

/**
 * @param props.systemes - Systèmes associés à l'installation de chauffage collectifs OU individuels
 * @param props.systemes[].role - {@linkcode SystemeRule.calcule_role}
 * @param props.systemes[].type_releve - {@linkcode SystemeRule.calcule_role}
 * @return Configuration de l'installation de chauffage
 */
export function calcule_configuration(props: {
	systemes: NonEmptyArray<{
		role: Chauffage.Systeme.Role;
		type_releve: Chauffage.Systeme.TypeReleve | null;
	}>;
}): Configuration {
	const { systemes } = props;
	const roles = systemes.map((s) => s.role);
	let releves = systemes.map((s) => s.type_releve);

	const configuration: Configuration = {
		base: 1,
		releve: 0,
		appoint: 0,
	};

	if (roles.includes(Chauffage.Systeme.RoleEnum.appoint))
		configuration.appoint = 0.25;

	if (roles.includes(Chauffage.Systeme.RoleEnum.releve)) {
		configuration.releve = releves.includes(
			Chauffage.Systeme.TypeReleveEnum.releve_chaudiere_bois,
		)
			? 0.25 * (1 - configuration.appoint)
			: 0.2 * (1 - configuration.appoint);
	}

	configuration.base = 1 - configuration.releve - configuration.appoint;
	return configuration;
}

/**
 * @param props.pch : {@linkcode ChauffageRule.calcule_pch}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @returns Puissance de chauffage de l'installation de chauffage en kW
 */
export function calcule_pch(props: { pch: number; rdim: number }): number {
	const { pch, rdim } = props;
	return pch * rdim;
}

/**
 * @param props.pch : {@linkcode calcule_pch}
 * @param props.pn_saisi : Puissances nominales saisies des systèmes de chauffage individuels associés à l'installation en kW
 * @return Puissance de chauffage individuelle de l'installation de chauffage en kW
 */
export function calcule_pch_ind(props: {
	pch: number;
	pn_saisi: (number | null)[];
}): number {
	const { pch, pn_saisi } = props;
	return pn_saisi.every((pn) => pn !== null)
		? pn_saisi.reduce((acc, pn) => acc + pn, 0)
		: 0.5 * pch;
}

/**
 * @param props.pch : {@linkcode calcule_pch}
 * @param props.pn_saisi : Puissances nominales saisies des systèmes de chauffage collectifs associés à l'installation en kW
 * @return Puissance de chauffage collective de l'installation de chauffage en kW
 */
export function calcule_pch_coll(props: {
	pch: number;
	pch_ind: number;
	pn_saisi: (number | null)[];
}): number {
	const { pch, pch_ind, pn_saisi } = props;
	return pn_saisi.every((pn) => pn !== null)
		? pn_saisi.reduce((acc, pn) => acc + pn, 0)
		: pch - pch_ind;
}

/**
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.sh : Surface habitable en m²
 * @param props.hsp : Hauteur sous plafond moyenne en m
 * @param props.i0 : {@linkcode calcule_i0}
 * @return Coefficient d'intermittence de l'installation de chauffage
 */
export function calcule_int(props: {
	gv: number;
	sh: number;
	hsp: number;
	i0: NonEmptyArray<number>;
}): number {
	const { gv, sh, hsp } = props;
	const G = gv / (sh * hsp);
	const i0 = props.i0.reduce((acc, value) => acc + value, 0) / props.i0.length;
	return i0 / (1 + 0.1 * (G - 1));
}

/**
 * @param props.fch_saisi - Facteur de couverture solaire saisi
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.type_batiment - Type de bâtiment
 * @returns Facteur de couverture solaire de l'installation de chauffage
 */
export function calcule_fch(props: {
	fch_saisi: number | null;
	zone_climatique: Batiment.ZoneClimatique;
	type_batiment: Batiment.TypeBatiment;
}): number {
	const { fch_saisi, ...query } = props;
	if (fch_saisi) return fch_saisi;
	const abaque = abaques.chauffage.fch;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.fch;
}
