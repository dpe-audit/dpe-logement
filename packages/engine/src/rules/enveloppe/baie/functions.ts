import { abaques } from "@open-dpe-logement/abaques";
import { Common, Enveloppe } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as LocalNonChauffeRule from "#rules/enveloppe/local-non-chauffe/functions.js";
import * as MasqueRule from "#rules/enveloppe/masque/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { createParMois } from "#utils/helpers.js";
import { linearInterpolate } from "#utils/math.js";

/**
 * @param props.ujn_saisi : Coefficient de transmission thermique de la baie avec fermeture saisi en W/(m².K)
 * @param props.uw : {@linkcode calcule_uw} | {@linkcode calcule_uw_complexe}
 * @param props.deltar : {@linkcode calcule_deltar} | {@linkcode calcule_deltar_complexe}
 * @see abaques.enveloppe.baie.ujn
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de transmission thermique de la baie avec fermeture en W/(m².K)
 */
export function calcule_ujn(props: {
	ujn_saisi: number | null;
	uw: number;
	deltar: number;
}): number {
	const { ujn_saisi, uw, ...query } = props;
	if (ujn_saisi) return ujn_saisi;

	const abaque = abaques.enveloppe.baie.ujn;
	const matches = abaque.search(query, abaque.load());
	const match = abaque.search({ uw }, matches).at(0);

	if (match) return match.ujn;
	if (matches.length === 0) throw new ValeurForfaitaireError(query);

	const points = matches.map((match) => ({
		x: match.uw,
		y: match.ujn,
	}));
	return linearInterpolate(props.uw, points);
}

/**
 * @param props.deltar1 : {@linkcode calcule_deltar}
 * @param props.deltar2 : {@linkcode calcule_deltar} | null en l'absence de double fenêtre
 * @return Résistance thermique additionnelle de la baie en m².K/W
 */
export function calcule_deltar_complexe(props: {
	deltar1: number;
	deltar2: number | null;
}): number {
	const { deltar1, deltar2 } = props;
	if (deltar2 === null) return deltar1;
	return Math.max(deltar1, deltar2);
}

/**
 * @param props.type_fermeture : Type de fermeture de la baie
 * @see abaques.enveloppe.baie.deltar
 * @throws {ValeurForfaitaireError}
 * @return Résistance thermique additionnelle apportée par la fermeture de la baie en m².K/W
 */
export function calcule_deltar(props: {
	type_fermeture: Enveloppe.Baie.TypeFermeture;
}): number {
	const abaque = abaques.enveloppe.baie.deltar;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.deltar;
}

/**
 * @param props.uw1 : {@linkcode calcule_uw}
 * @param props.uw2 : {@linkcode calcule_uw} | null en l'absence de double fenêtre
 * @return Coefficient de transmission thermique de la baie avec double fenêtre en W/(m².K)
 */
export function calcule_uw_complexe(props: {
	uw1: number;
	uw2: number | null;
}): number {
	const { uw1, uw2 } = props;
	if (uw2 === null) return uw1;
	return 1 / (1 / uw1 + 1 / uw2 + 0.07);
}

/**
 * @param props.uw_saisi : Coefficient de transmission thermique de la baie saisi en W/(m².K)
 * @param props.type_baie : Type de baie
 * @param props.presence_soubassement : Indique la présence d'un soubassement
 * @param props.materiau : {@linkcode set_materiau}
 * @param props.presence_rupteur_pont_thermique : {@linkcode set_presence_rupteur_pont_thermique}
 * @param props.ug : {@linkcode calcule_ug}
 * @see abaques.enveloppe.baie.uw
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de transmission thermique de la baie  en W/(m².K)
 */
export function calcule_uw(props: {
	uw_saisi: number | null;
	type_baie: Enveloppe.Baie.TypeBaie;
	presence_soubassement: boolean | null;
	materiau: Enveloppe.Baie.Materiau | null;
	presence_rupteur_pont_thermique: boolean | null;
	ug: number;
}): number {
	const { uw_saisi, ug, ...query } = props;
	if (uw_saisi) return uw_saisi;

	const abaque = abaques.enveloppe.baie.uw;
	const matches = abaque.search(query, abaque.load());
	const match = abaque.search({ ug }, matches).at(0);
	if (match) return match.uw;
	if (matches.length === 0) throw new ValeurForfaitaireError(query);

	// Ug est injecté dans les points d'abaque pour permettre l'interpolation linéaire
	const points = matches.map((match) => ({
		x: match.ug ?? props.ug,
		y: match.uw,
	}));
	return linearInterpolate(props.ug, points);
}

/**
 * @param props.ug_saisi : Coefficient de transmission thermique du vitrage saisi en W/(m².K)
 * @param props.type_baie : Type de baie
 * @param props.type_vitrage : {@linkcode set_type_vitrage}
 * @param props.type_survitrage : {@linkcode set_type_survitrage}
 * @param props.nature_lame_air : {@linkcode set_nature_lame_air}
 * @param props.epaisseur_lame_air : {@linkcode set_epaisseur_lame_air}
 * @param props.inclinaison_vitrage : Inclinaison du vitrage de la baie en degrés
 * @see abaques.enveloppe.baie.ug
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de transmission thermique du vitrage de la baie en W/(m².K)
 */
export function calcule_ug(props: {
	ug_saisi: number | null;
	type_baie: Enveloppe.Baie.TypeBaie;
	type_vitrage: Enveloppe.Baie.TypeVitrage;
	type_survitrage: Enveloppe.Baie.TypeSurvitrage | null;
	nature_lame_air: Enveloppe.Baie.NatureLame | null;
	epaisseur_lame_air: number | null;
	inclinaison_vitrage: number | null;
}): number {
	const { ug_saisi, ...query } = props;
	if (ug_saisi) return ug_saisi;
	const abaque = abaques.enveloppe.baie.ug;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.ug;
}

/**
 * @param props.surface : Surface de la baie en m²
 * @param props.sw : {@linkcode calcule_sw}
 * @param props.fe : {@linkcode calcule_fe}
 * @param props.t : {@linkcode LocalNonChauffeRule.calcule_tmoy}
 * @param props.c1 : {@linkcode ClimatRule.calcule_c1}
 * @return Surface sud équivalente de la baie en m²/mois
 */
export function calcule_sse(props: {
	surface: number;
	sw: number;
	fe: number;
	t: number | null;
	c1: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { surface, sw, fe, c1 } = props;
	const t = props.t === null ? 1 : props.t;
	return createParMois((mois: Common.Mois) => surface * sw * fe * c1[mois] * t);
}

/**
 * @param props.sw_saisi : Proportion d'énergie solaire incidente transmise par la baie saisie
 * @param props.type_baie : Type de baie
 * @param props.presence_soubassement : Indique la présence d'un soubassement
 * @param props.materiau : {@linkcode set_materiau}
 * @param props.type_vitrage : {@linkcode set_type_vitrage}
 * @param props.type_pose : Type de pose de la baie
 * @param props.type_survitrage : {@linkcode set_type_survitrage}
 * @see abaques.enveloppe.baie.sw
 * @throws {ValeurForfaitaireError}
 * @returns Proportion d'énergie solaire incidente transmise par la baie
 */
export function calcule_sw(props: {
	sw_saisi: number | null;
	type_baie: Enveloppe.Baie.TypeBaie;
	presence_soubassement: boolean | null;
	materiau: Enveloppe.Baie.Materiau | null;
	type_vitrage: Enveloppe.Baie.TypeVitrage | null;
	type_pose: Enveloppe.Common.TypePose | null;
	type_survitrage: Enveloppe.Baie.TypeSurvitrage | null;
}): number {
	const { sw_saisi, ...query } = props;
	if (sw_saisi) return sw_saisi;
	const abaque = abaques.enveloppe.baie.sw;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.sw;
}

/**
 * @param props.fe1 : {@linkcode MasqueRule.calcule_fe1}
 * @param props.fe2 : {@linkcode MasqueRule.calcule_fe2}
 * @returns Facteur d'ensoleillement de la baie dû à la présence de masques
 */
export function calcule_fe(props: { fe1: number; fe2: number }): number {
	const { fe1, fe2 } = props;
	return fe1 * fe2;
}

/**
 * @param props.fe1 : {@linkcode MasqueRule.calcule_fe1}
 * @returns Facteur d'ensoleillement dû aux masques proches
 */
export function calcule_fe1(props: { fe1: number[] }): number {
	const { fe1 } = props;
	return fe1.length === 0 ? 1 : Math.min(...fe1);
}

/**
 * @param props.fe2 : {@linkcode MasqueRule.calcule_fe2}
 * @param props.omb : {@linkcode MasqueRule.calcule_omb}
 * @returns Facteur d'ensoleillement dû aux masques lointains
 */
export function calcule_fe2(props: { fe2: number[]; omb: number[] }): number {
	const { fe2, omb } = props;
	const fe2Min = fe2.length === 0 ? 1 : Math.min(...fe2);
	const sumOmb = omb.reduce((sum, value) => sum + value, 0);
	const fe2Omb = Math.max(1 - sumOmb / 100, 0);
	return Math.min(fe2Min, fe2Omb);
}

/**
 * @param props.type_vitrage : Type de vitrage saisi
 * @returns Type de vitrage retenu
 */
export function set_type_vitrage(props: {
	type_vitrage: Enveloppe.Baie.TypeVitrage | null;
}): Enveloppe.Baie.TypeVitrage {
	const { type_vitrage } = props;
	return type_vitrage === null
		? Enveloppe.Baie.TypeVitrageEnum.simple_vitrage
		: type_vitrage;
}

/**
 * @param props.type_survitrage : Type de survitrage saisi
 * @returns Type de survitrage retenu
 */
export function set_type_survitrage(props: {
	type_survitrage: Enveloppe.Baie.TypeSurvitrage | null;
}): Enveloppe.Baie.TypeSurvitrage | null {
	const { type_survitrage } = props;
	return type_survitrage === null
		? Enveloppe.Baie.TypeSurvitrageEnum.survitrage_simple
		: type_survitrage;
}

/**
 * @param props.materiau : Matériau saisi
 * @returns Matériau retenu
 */
export function set_materiau(props: {
	materiau: Enveloppe.Baie.Materiau | null;
}): Enveloppe.Baie.Materiau {
	const { materiau } = props;
	return materiau === null ? Enveloppe.Baie.MateriauEnum.pvc : materiau;
}

/**
 * @param props.nature_lame_air : Nature de la lame d'air saisie
 * @returns Nature de la lame d'air retenue
 */
export function set_nature_lame_air(props: {
	nature_lame_air: Enveloppe.Baie.NatureLame | null;
}): Enveloppe.Baie.NatureLame {
	const { nature_lame_air } = props;
	return nature_lame_air === null
		? Enveloppe.Baie.NatureLameEnum.air
		: nature_lame_air;
}

/**
 * @param props.epaisseur_lame_air : Épaisseur de la lame d'air saisie en mm
 * @returns Épaisseur de la lame d'air retenue en mm
 */
export function set_epaisseur_lame_air(props: {
	epaisseur_lame_air: number | null;
}): number {
	const { epaisseur_lame_air } = props;
	return epaisseur_lame_air === null ? 6 : epaisseur_lame_air;
}

/**
 * @param props.presence_rupteur_pont_thermique : Présence d'un rupteur de pont thermique saisie
 * @returns Présence d'un rupteur de pont thermique retenue
 */
export function set_presence_rupteur_pont_thermique(props: {
	presence_rupteur_pont_thermique: boolean | null;
}): boolean {
	const { presence_rupteur_pont_thermique } = props;
	return presence_rupteur_pont_thermique ? true : false;
}
