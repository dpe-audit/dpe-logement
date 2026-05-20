import { abaques } from "@open-dpe-logement/abaques";
import type { Batiment, Enveloppe } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as climat from "#rules/climat/functions.js";
import * as chauffage from "#rules/chauffage/functions.js";
import * as paroi from "#rules/enveloppe/paroi/functions.js";

/**
 * @props props.u_saisi : Coefficient de transmission thermique du mur saisi en W/m².K
 * @props props.zone_climatique : {@linkcode climat.calcule_zone_climatique}
 * @props props.effet_joule : {@linkcode chauffage.calcule_effet_joule}
 * @props props.u0 : {@linkcode calcule_u0}
 * @props props.isolation : Etat de l'isolation du mur
 * @props props.type_isolation : Type d'isolation du mur
 * @props props.epaisseur_isolation : Epaisseur de l'isolation du mur en mm
 * @props props.resistance_thermique_isolation : Résistance thermique de l'isolation du mur en m².K/W
 * @props props.annee_isolation : Année d'isolation du mur
 * @props props.annee_construction : {@linkcode paroi.set_annee_construction}
 * @see abaques.enveloppe.mur.uph
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de transmission thermique du mur en W/m².K
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
			return 1 / (1 / u0 + epaisseur_isolation / 1000 / 0.04);
		}
	}

	const { annee_construction, annee_isolation } = props;
	const annee_construction_isolation =
		annee_isolation ?? (annee_construction <= 1974 ? 1976 : annee_construction);

	const abaque = abaques.enveloppe.mur.umur;
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
 * @see https://github.com/dpe-audit/dpe-logement/issues/41
 * @see https://github.com/dpe-audit/dpe-logement/issues/47
 * @props props.u0_saisi : Coefficient de transmission thermique du mur nu saisi en W/m².K
 * @props props.annee_construction : {@linkcode paroi.set_annee_construction}
 * @props props.structures : Structures du mur
 * @props props.structures[].materiau : Matériau de la structure du mur
 * @props props.structures[].epaisseur : Epaisseur de la structure du mur en mm
 * @see abaques.enveloppe.mur.umur0
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de transmission thermique du mur nu en W/m².K
 */
export function calcule_u0(props: {
	u0_saisi: number | null;
	annee_construction: number;
	structures: {
		materiau: Enveloppe.Mur.MateriauMur | null;
		epaisseur: number | null;
	}[];
}): number {
	const { u0_saisi, annee_construction } = props;

	if (u0_saisi) return Math.min(u0_saisi, 2.5);

	const structures = props.structures.filter((structure) => structure.materiau);
	if (structures.length === 0) return 2.5;

	const abaque = abaques.enveloppe.mur.umur0;
	const data = abaque.load();

	const values: number[] = structures.map((structure) => {
		const query = {
			type_mur: structure.materiau,
			epaisseur_mur: structure.epaisseur ?? 0,
			annee_construction,
		};
		const match = abaque.search(query, data).at(0);
		if (!match) throw new ValeurForfaitaireError(query);
		return match.u0;
	});

	const u0 = values.reduce((acc, value) => 1 / (1 / acc + 1 / value));
	return Math.min(u0, 2.5);
}
