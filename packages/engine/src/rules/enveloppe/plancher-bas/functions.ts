import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Enveloppe } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { bilinearInterpolate } from "#utils/interpolate.js";
import * as climat from "#rules/climat/functions.js";
import * as chauffage from "#rules/chauffage/functions.js";
import * as paroi from "#rules/enveloppe/paroi/functions.js";

/**
 * @props props.u_saisi : Coefficient de transmission thermique du plancher bas saisi en W/m².K
 * @props props.zone_climatique : {@linkcode climat.calcule_zone_climatique}
 * @props props.effet_joule : {@linkcode chauffage.calcule_effet_joule}
 * @props props.u0 : {@linkcode calcule_u0}
 * @props props.isolation : Etat de l'isolation du plancher bas
 * @props props.type_isolation : Type d'isolation du plancher bas
 * @props props.epaisseur_isolation : Epaisseur de l'isolation du plancher bas en mm
 * @props props.resistance_thermique_isolation : Résistance thermique de l'isolation du plancher bas en m².K/W
 * @props props.annee_isolation : Année d'isolation du plancher bas
 * @props props.annee_construction : {@linkcode paroi.set_annee_construction}
 * @see abaques.enveloppe.plancherBas.uph
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de transmission thermique du plancher bas en W/m².K
 */
export function calcule_u(props: {
	u_saisi: number | null;
	zone_climatique: Batiment.ZoneClimatique;
	effet_joule: boolean;
	u0: number;
	isolation: boolean | null;
	type_isolation: Enveloppe.Common.TypeIsolation | null;
	epaisseur_isolation: number | null;
	resistance_thermique_isolation: number | null;
	annee_isolation: number | null;
	annee_construction: number;
}): number {
	const { u_saisi, isolation, u0 } = props;

	if (u_saisi) return u_saisi;

	if (isolation === false) return u0;

	if (isolation) {
		const { resistance_thermique_isolation, epaisseur_isolation } = props;

		if (resistance_thermique_isolation) {
			return 1 / (1 / u0 + resistance_thermique_isolation);
		} else if (epaisseur_isolation) {
			return 1 / (1 / u0 + epaisseur_isolation / 1000 / 0.042);
		}
	}

	const { annee_construction, annee_isolation } = props;
	const annee_construction_isolation =
		annee_isolation ?? (annee_construction <= 1974 ? 1976 : annee_construction);

	const abaque = abaques.enveloppe.plancherBas.upb;
	const query = {
		zone_climatique: props.zone_climatique,
		effet_joule: props.effet_joule,
		annee_construction_isolation,
	};
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return Math.min(match.u, u0);
}

/**
 * @props props.mitoyennete : {@linkcode calcule_ue_applicable}
 * @props props.annee_construction : {@linkcode paroi.set_annee_construction}
 * @props props.u : {@linkcode calcule_u}
 * @props props.surface_ue : Surface du plancher du bâtiment ou du lot sur terre-plein, vide sanitaire ou sous-sol non chauffé en m²
 * @props props.perimetre_ue : Périmètre du plancher du bâtiment ou du lot sur terre-plein, vide sanitaire ou sous-sol non chauffé en m
 * @see abaques.enveloppe.plancherBas.ue
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de transmission thermique du plancher bas en W/m².K
 */
export function calcule_ue(props: {
	mitoyennete:
		| typeof Enveloppe.Common.MitoyenneteEnum.terre_plein
		| typeof Enveloppe.Common.MitoyenneteEnum.vide_sanitaire
		| typeof Enveloppe.Common.MitoyenneteEnum.sous_sol_non_chauffe;
	annee_construction: number;
	u: number;
	surface_ue: number;
	perimetre_ue: number;
}): number {
	const { u, surface_ue, perimetre_ue } = props;
	const _2sp = Math.round((2 * surface_ue) / perimetre_ue);

	const { mitoyennete, annee_construction } = props;
	const abaque = abaques.enveloppe.plancherBas.ue;
	const query = { mitoyennete, annee_construction };
	const matches = abaque.search(query, abaque.load());
	const match = abaque.search({ u }, matches).at(0);

	if (match) return match.ue;
	if (matches.length === 0) throw new ValeurForfaitaireError(props);

	const points = matches.map((match) => ({
		x: match["2s/p"],
		y: match.u,
		q: match.ue,
	}));
	return bilinearInterpolate(_2sp, u, points);
}

/**
 * @props props.mitoyennete : Mitoyenneté du plancher bas
 * @returns Indique si la méthode de calcul Ue est applicable pour le plancher bas
 */
export function calcule_ue_applicable(props: {
	mitoyennete: Enveloppe.Common.Mitoyennete;
}): boolean {
	const scopes: Enveloppe.Common.Mitoyennete[] = [
		Enveloppe.Common.MitoyenneteEnum.terre_plein,
		Enveloppe.Common.MitoyenneteEnum.vide_sanitaire,
		Enveloppe.Common.MitoyenneteEnum.sous_sol_non_chauffe,
	];
	return scopes.includes(props.mitoyennete);
}

/**
 * @props props.u0_saisi : Coefficient de transmission thermique du plancher bas nu saisi en W/m².K
 * @param props.type_plancher_bas : Type de plancher bas
 * @see abaques.enveloppe.plancherBas.upb0
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de transmission thermique du plancher bas nu en W/m².K
 */
export function calcule_u0(props: {
	u0_saisi: number | null;
	type_plancher_bas: Enveloppe.PlancherBas.TypePlancherBas | null;
}): number {
	const { u0_saisi, type_plancher_bas } = props;

	if (u0_saisi) return u0_saisi;
	if (type_plancher_bas === null) return 2;

	const abaque = abaques.enveloppe.plancherBas.upb0;
	const match = abaque.search({ type_plancher_bas }, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.u0;
}
