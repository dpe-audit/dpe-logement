import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Common, Ecs } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as EcsRule from "#rules/ecs/functions.js";
import * as InstallationRule from "#rules/ecs/installation/functions.js";
import * as SystemeRule from "#rules/ecs/systeme/functions.js";
import * as GenerateurChauffageRule from "#rules/chauffage/generateur/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { reduceParMois } from "#utils/helpers.js";
import { evaluate } from "#utils/math.js";

/**
 * @param props.cecs : {@linkcode SystemeRule.calcule_cecs}
 * @return Consommations du générateur d'eau chaude sanitaire en kWh/an
 */
export function calcule_cecs(props: { cecs: number[] }): number {
	return props.cecs.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.becs : {@linkcode EcsRule.calcule_becs}
 * @param props.pn : {@linkcode calcule_pn}
 * @param props.paux : {@linkcode calcule_paux}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @return Consommations de l'auxiliaire de génération d'eau chaude sanitaire en kWh/an
 */
export function calcule_caux(props: {
	becs: Common.ParMois<number>;
	pn: number;
	paux: number;
	rdim: number;
}): number {
	const { pn, paux, rdim } = props;
	const becs = reduceParMois(props.becs);
	return (paux * becs * rdim) / pn;
}

/**
 * @param props.systemes - Systèmes associés au générateur d'eau chaude sanitaire
 * @param props.systemes[].rdim - {@linkcode SystemeRule.calcule_rdim}
 * @param props.systemes[].rdim_installation - {@linkcode InstallationRule.calcule_rdim}
 * @returns Ratio de dimensionnement du générateur d'eau chaude sanitaire
 */
export function calcule_rdim(props: {
	systemes: { rdim: number; rdim_installation: number }[];
}): number {
	const { systemes } = props;
	return systemes.reduce((acc, s) => acc + s.rdim * s.rdim_installation, 0);
}

/**
 * @param props.pn_saisi : Puissance nominale saisie du générateur d'eau chaude sanitaire en kW
 * @param props.pdim : {@linkcode calcule_pdim}
 * @returns Puissance nominale conventionnelle du générateur d'eau chaude sanitaire en kW
 */
export function calcule_pn(props: {
	pn_saisi: number | null;
	pdim: number;
}): number {
	const { pn_saisi, pdim } = props;
	return pn_saisi ?? pdim;
}

/**
 * @param props.pecs : {@linkcode calcule_pecs}
 * @param props.pch : {@linkcode GenerateurChauffageRule.calcule_pch}
 * @returns Puissance de dimensionnement du générateur en kW
 */
export function calcule_pdim(props: {
	pecs: number;
	pch: number | null;
}): number {
	const { pecs, pch } = props;
	return pch ? Math.max(pecs, pch) : pecs;
}

/**
 * @param props.pn_saisi : Puissance nominale saisie du générateur d'eau chaude sanitaire en kW
 * @param props.volume_stockage : {@link set_volume_stockage}
 * @returns Puissance de dimensionnement du besoin d'eau chaude sanitaire en kW
 */
export function calcule_pecs(props: {
	pn_saisi: number | null;
	volume_stockage: number;
}): number {
	const { pn_saisi, volume_stockage } = props;
	if (pn_saisi) return pn_saisi;
	switch (true) {
		case volume_stockage === 0:
			return 21;
		case volume_stockage <= 20:
			return 21 - 0.8 * volume_stockage;
		case volume_stockage <= 150:
			return 5 - 1.751 * ((volume_stockage - 20) / 65);
		default:
			return (7.14 * volume_stockage + 428) / 1000;
	}
}

/**
 * @param props.type_generateur : {@linkcode set_type_generateur}
 * @param props.energie_generateur : {@linkcode set_energie_generateur}
 * @param props.generateur_multi_batiment : Générateur multi-bâtiment
 * @param props.presence_ventouse : {@linkcode set_presence_ventouse}
 * @param props.pn : {@linkcode calcule_pn}
 * @see abaques.ecs.paux
 * @throws {ValeurForfaitaireError}
 * @return Puissance de l'auxiliaire de génération d'eau chaude sanitaire en kW
 */
export function calcule_paux(props: {
	type_generateur: Ecs.Generateur.TypeGenerateur;
	energie_generateur: Ecs.Generateur.EnergieEcs;
	generateur_multi_batiment: boolean;
	presence_ventouse: boolean | null;
	pn: number;
}): number {
	const { pn, generateur_multi_batiment, ...query } = props;
	if (generateur_multi_batiment) return 0;
	const abaque = abaques.ecs.paux;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	const G = match.G;
	const H = match.H;
	const Pn = match.pn_max ? Math.min(match.pn_max, pn) : pn;
	const scope = { G, H, Pn };
	return evaluate(match.paux, scope);
}

/**
 * @param props.cop_saisi : Coefficient de performance énergétique saisi
 * @param props.zone_climatique : {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.type_generateur : {@linkcode set_type_generateur}
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @see abaques.ecs.cop
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de performance énergétique du générateur d'eau chaude sanitaire
 */
export function calcule_cop(props: {
	cop_saisi: number | null;
	zone_climatique: Batiment.ZoneClimatique;
	type_generateur: Ecs.Generateur.GenerateurThermodynamique["type"];
	annee_installation: number;
}): number {
	const { cop_saisi, ...query } = props;
	if (cop_saisi) return cop_saisi;
	const abaque = abaques.ecs.cop;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.cop;
}

export type Combustion = {
	// Rendement à pleine charge
	rpn: number;
	// Pertes à l'arrêt en kW
	qp0: number;
	// Puissance de la veilleuse en W
	pveilleuse: number;
};

/**
 * @param props.rpn_saisi : Rendement à pleine charge saisi
 * @param props.qp0_saisi : Pertes à l'arrêt en kW saisies
 * @param props.pveilleuse_saisi : Puissance de la veilleuse en W saisie
 * @param props.type_generateur : {@linkcode set_type_generateur}
 * @param props.energie_generateur : {@linkcode set_energie_generateur}
 * @param props.mode_combustion : {@linkcode set_mode_combustion}
 * @param props.volume_stockage : {@linkcode set_volume_stockage}
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @param props.pn : {@linkcode calcule_pn}
 * @param props.presence_ventouse : {@linkcode set_presence_ventouse}
 * @see abaques.ecs.combustion
 * @throws {ValeurForfaitaireError}
 * @return Performances du générateur d'eau chaude sanitaire à combustion
 */

type CalculeCombustionProps = {
	// Rendement à pleine charge saisi
	rpn_saisi: number | null;
	// Pertes à l'arrêt en kW saisies
	qp0_saisi: number | null;
	// Puissance de la veilleuse en W saisie
	pveilleuse_saisi: number | null;
	// Type de générateur d'eau chaude sanitaire
	mode_combustion: Ecs.Generateur.ModeCombustion;
	/** {@linkcode set_volume_stockage} */
	volume_stockage: number;
	/** {@linkcode set_annee_installation} */
	annee_installation: number;
	/** {@linkcode calcule_pn} */
	pn: number;
	/** {@linkcode set_presence_ventouse} */
	presence_ventouse: boolean;
};

export function calcule_combustion(
	props:
		| GenerateurCombustionProps<CalculeCombustionProps>
		| PacHybrideProps<CalculeCombustionProps>,
): Combustion {
	const {
		rpn_saisi,
		qp0_saisi,
		pveilleuse_saisi,
		presence_ventouse,
		...query
	} = props;
	const combustion: Partial<Combustion> = {};

	if (rpn_saisi) combustion.rpn = rpn_saisi;
	if (qp0_saisi) combustion.qp0 = qp0_saisi;
	if (pveilleuse_saisi) combustion.pveilleuse = pveilleuse_saisi;

	if (combustion.rpn && combustion.qp0 && combustion.pveilleuse)
		return combustion as Combustion;

	const energie_generateur =
		props.type_generateur ===
		Ecs.Generateur.TypeGenerateurEnum.pac_double_service
			? props.bienergie_generateur
			: props.energie_generateur;

	const abaque = abaques.ecs.combustion;
	const match = abaque
		.search({ ...query, ...{ energie_generateur } }, abaque.load())
		.at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	const E = presence_ventouse ? 1.75 : 2.5;
	const F = presence_ventouse ? -0.55 : -0.8;
	const Pn = match.pn_max ? Math.min(match.pn_max, props.pn) : props.pn;
	const logPn = Math.log10(Pn);
	const scope = { E, F, Pn, logPn };

	combustion.rpn = combustion.rpn ?? evaluate(match.rpn, scope);
	combustion.qp0 = combustion.qp0 ?? evaluate(match.qp0, scope);
	combustion.pveilleuse = combustion.pveilleuse ?? match.pveilleuse;

	return combustion as Combustion;
}

/**
 * @param props.position_chauffe_eau : Position du chauffe-eau
 * @param props.label_generateur : Label du générateur d'eau chaude sanitaire
 * @param props.volume_stockage : {@linkcode set_volume_stockage}
 * @see abaques.ecs.cr
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de perte du ballon de stockage en Wh/l.°C.jour
 */
export function calcule_cr(props: {
	type_generateur: Ecs.Generateur.ChauffeEauElectrique["type"];
	energie_generateur: Ecs.Generateur.ChauffeEauElectrique["energie"];
	position_chauffe_eau: Ecs.Generateur.PositionChauffeEau;
	label_generateur: Ecs.Generateur.Label | null;
	volume_stockage: number;
}): number {
	const { position_chauffe_eau } = props;
	if (!position_chauffe_eau) return 0;
	const abaque = abaques.ecs.cr;
	const query = props;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.cr;
}

/**
 * @param props.cr : {@linkcode calcule_cr}
 * @param props.volume_stockage : {@linkcode set_volume_stockage}
 * @return Pertes de stockage en Wh/an
 */
export function calcule_qgw(props: {
	energie_generateur: Ecs.Generateur.EnergieEcs;
	cr: number;
	volume_stockage: number | null;
}): number {
	const { energie_generateur, cr } = props;
	const volume_stockage = props.volume_stockage ?? 0;
	if (volume_stockage === 0) return 0;
	return energie_generateur === Ecs.Generateur.EnergieEcsEnum.electricite
		? 8592 * (45 / 24) * volume_stockage * cr
		: 67662 * volume_stockage ** 0.55;
}

/**
 * @param props.generateur_mixte : Générateur assurant la production d'eau chaude sanitaire et de chauffage
 * @param props.presence_ventouse : {@linkcode set_presence_ventouse}
 * @param props.qp0 : {@linkcode calcule_combustion}
 * @return Pertes de génération du générateur d'eau chaude sanitaire en Wh/an
 */
export function calcule_qgen(props: {
	generateur_mixte: boolean;
	presence_ventouse: boolean | null;
	qp0: number | null;
}): number {
	const { generateur_mixte } = props;
	if (!generateur_mixte) return 0;
	const qp0 = props.qp0 ? props.qp0 * 1000 : 0;
	const cper = props.presence_ventouse ? 0.75 : 5;
	return 0.48 * cper * qp0;
}

/**
 * @param props.type_generateur : Type de générateur d'eau chaude sanitaire saisi
 * @return Type de générateur d'eau chaude sanitaire retenu
 */
export function set_type_generateur(props: {
	type_generateur: Ecs.Generateur.TypeGenerateur | null;
}): Ecs.Generateur.TypeGenerateur {
	const { type_generateur } = props;
	return type_generateur ?? Ecs.Generateur.TypeGenerateurEnum.chaudiere;
}

/**
 * @param props.energie_generateur : Energie du générateur d'eau chaude sanitaire saisie
 * @return Energie du générateur d'eau chaude sanitaire retenue
 */
export function set_energie_generateur(props: {
	energie_generateur: Ecs.Generateur.EnergieEcs | null;
}): Ecs.Generateur.EnergieEcs {
	const { energie_generateur } = props;
	return energie_generateur ?? Ecs.Generateur.EnergieEcsEnum.fioul;
}

/**
 * @param props.mode_combustion : Mode de combustion du générateur d'eau chaude sanitaire saisi
 * @return Mode de combustion du générateur d'eau chaude sanitaire retenu
 */
export function set_mode_combustion(props: {
	mode_combustion: Ecs.Generateur.ModeCombustion | null;
}): Ecs.Generateur.ModeCombustion {
	const { mode_combustion } = props;
	return mode_combustion ?? Ecs.Generateur.ModeCombustionEnum.standard;
}

/**
 * @param props.presence_ventouse : Présence d'une ventouse sur le générateur d'eau chaude sanitaire saisie
 * @return Présence d'une ventouse sur le générateur d'eau chaude sanitaire retenue
 */
export function set_presence_ventouse(props: {
	presence_ventouse: boolean | null;
}): boolean {
	const { presence_ventouse } = props;
	return presence_ventouse ?? false;
}

/**
 * @param props.annee_installation : Année d'installation du générateur d'eau chaude sanitaire saisie
 * @param props.annee_construction_batiment : Année de construction du bâtiment
 * @return Année d'installation du générateur d'eau chaude sanitaire retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}

/**
 * @param props.volume_stockage : Volume de stockage d'eau chaude sanitaire en litres saisi
 * @returns Volume de stockage d'eau chaude sanitaire en litres retenu
 */
export function set_volume_stockage(props: {
	volume_stockage: number | null;
}): number {
	const { volume_stockage } = props;
	return volume_stockage ?? 50;
}

export type GenerateurCombustionProps<T> = T & {
	type_generateur: Ecs.Generateur.GenerateurCombustion["type"];
	energie_generateur: Ecs.Generateur.GenerateurCombustion["energie"];
};
export type ChaudiereCombustionProps<T> = T & {
	type_generateur: Ecs.Generateur.ChaudiereCombustion["type"];
	energie_generateur: Ecs.Generateur.ChaudiereCombustion["energie"];
};
export type PoeleBoisBouilleurProps<T> = T & {
	type_generateur: Ecs.Generateur.PoeleBoisBouilleur["type"];
	energie_generateur: Ecs.Generateur.PoeleBoisBouilleur["energie"];
};
export type ChauffeEauGazProps<T> = T & {
	type_generateur: Ecs.Generateur.ChauffeEauGaz["type"];
	energie_generateur: Ecs.Generateur.ChauffeEauGaz["energie"];
};
export type GenerateurElectriqueProps<T> = T & {
	type_generateur: Ecs.Generateur.GenerateurElectrique["type"];
	energie_generateur: Ecs.Generateur.GenerateurElectrique["energie"];
};
export type ChaudiereElectriqueProps<T> = T & {
	type_generateur: Ecs.Generateur.ChaudiereElectrique["type"];
	energie_generateur: Ecs.Generateur.ChaudiereElectrique["energie"];
};
export type ChauffeEauElectriqueProps<T> = T & {
	type_generateur: Ecs.Generateur.ChauffeEauElectrique["type"];
	energie_generateur: Ecs.Generateur.ChauffeEauElectrique["energie"];
};
export type GenerateurThermodynamiqueProps<T> = T & {
	type_generateur: Ecs.Generateur.GenerateurThermodynamique["type"];
	energie_generateur: Ecs.Generateur.GenerateurThermodynamique["energie"];
};
export type ChauffeEauThermodynamiqueProps<T> = T & {
	type_generateur: Ecs.Generateur.ChauffeEauThermodynamique["type"];
	energie_generateur: Ecs.Generateur.ChauffeEauThermodynamique["energie"];
};
export type PacDoubleServiceProps<T> = T & {
	type_generateur: Ecs.Generateur.PacDoubleService["type"];
	energie_generateur: Ecs.Generateur.PacDoubleService["energie"];
	bienergie_generateur: Ecs.Generateur.PacDoubleService["bienergie"];
};
export type PacHybrideProps<T> = T & {
	type_generateur: Ecs.Generateur.PacHybride["type"];
	energie_generateur: Ecs.Generateur.PacHybride["energie"];
	bienergie_generateur: Ecs.Generateur.PacHybride["bienergie"];
};
export type ReseauChaleurProps<T> = T & {
	type_generateur: Ecs.Generateur.ReseauChaleur["type"];
	energie_generateur: Ecs.Generateur.ReseauChaleur["energie"];
};
