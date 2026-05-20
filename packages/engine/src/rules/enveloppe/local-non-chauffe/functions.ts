import { abaques } from "@open-dpe-logement/abaques";
import { Enveloppe } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as climat from "#rules/climat/functions.js";
import * as baie from "#rules/enveloppe/baie/functions.js";
import * as paroi from "#rules/enveloppe/paroi/functions.js";

/**
 * @param props.aue : {@linkcode calcule_aue}
 * @param props.aiu : {@linkcode calcule_aiu}
 * @param props.isolation_aue : {@linkcode calcule_isolation_aue}
 * @param props.isolation_aiu : {@linkcode calcule_isolation_aiu}
 * @param props.uvue : {@linkcode calcule_uvue}
 * @see abaques.enveloppe.localNonChauffe.b
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de réduction des déperditions thermiques de l'espace tampon solarisé
 */
export function calcule_b(props: {
	aue: number;
	aiu: number;
	isolation_aue: boolean;
	isolation_aiu: boolean;
	uvue: number;
}): number {
	const { aue, aiu, isolation_aue, isolation_aiu, uvue } = props;
	const aiu_aue = aiu / aue;
	const abaque = abaques.enveloppe.localNonChauffe.b;
	const query = { uvue, aiu_aue, isolation_aue, isolation_aiu };
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.b;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/45
 * @param props.parois : Liste des parois déperditives donnant sur l'espace tampon solarisé
 * @param props.parois[].surface : Surface de la paroi en m²
 * @param props.parois[].bver : {@linkcode paroi.calcule_bver}
 * @returns Coefficient de réduction des déperditions thermiques de l'espace tampon solarisé
 */
export function calcule_bver(props: {
	parois: { surface: number; bver: number }[];
}): number {
	const { parois } = props;
	const s = parois.reduce((acc, paroi) => acc + paroi.surface, 0);
	const w = parois.reduce((acc, paroi) => acc + paroi.surface * paroi.bver, 0);
	return w / s;
}

/**
 * @param props.type_local_non_chauffe : Type du local non chauffé
 * @see abaques.enveloppe.localNonChauffe.uvue
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de transmission thermique éauivalent du local non chauffé en W/m².K
 */
export function calcule_uvue(props: {
	type_local_non_chauffe: Exclude<
		Enveloppe.LocalNonChauffe.TypeLnc,
		typeof Enveloppe.LocalNonChauffe.TypeLncEnum.espace_tampon_solarise
	>;
}): number {
	const abaque = abaques.enveloppe.localNonChauffe.uvue;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.uvue;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/40
 * @param props.mitoyennete : Mitoyenneté de la paroi du local non chauffé
 * @param props.surface : Surface de la paroi du local non chauffé en m²
 * @returns Surface de la paroi du local non chauffé donnant sur l'extérieur ou en contact avec le sol en m²
 */
export function calcule_aue(props: {
	mitoyennete: Enveloppe.Common.Mitoyennete;
	surface: number;
}): number {
	const { mitoyennete, surface } = props;

	const scopes: Enveloppe.Common.Mitoyennete[] = [
		Enveloppe.Common.MitoyenneteEnum.exterieur,
		Enveloppe.Common.MitoyenneteEnum.enterre,
		Enveloppe.Common.MitoyenneteEnum.local_non_accessible,
	];

	return scopes.includes(mitoyennete) ? surface : 0;
}

/**
 * @param props.mitoyennete : Mitoyenneté de la paroi du local non chauffé
 * @param props.surface : Surface de la paroi du local non chauffé en m²
 * @returns Surface de la paroi du local non chauffé donnant sur un espace chauffé en m²
 */
export function calcule_aiu(props: {
	mitoyennete: Enveloppe.Common.Mitoyennete;
	surface: number;
}): number {
	const { mitoyennete, surface } = props;

	const scopes: Enveloppe.Common.Mitoyennete[] = [
		Enveloppe.Common.MitoyenneteEnum.local_residentiel,
		Enveloppe.Common.MitoyenneteEnum.local_non_residentiel,
	];

	return scopes.includes(mitoyennete) ? surface : 0;
}

/**
 * @param props.aue : {@linkcode calcule_aue}
 * @param props.aue_isole : {@linkcode calcule_isolation_baie} | {@linkcode set_isolation_paroi}
 * @return État d'isolation moyen des parois du local non chauffé donnant sur l'extérieur ou en contact avec le sol
 */
export function calcule_isolation_aue(props: {
	aue: number;
	aue_isole: number;
}): boolean {
	const { aue, aue_isole } = props;
	return aue_isole / aue >= 0.5;
}

/**
 * @param props.aiu : {@linkcode calcule_aiu}
 * @param props.aiu_isole : {@linkcode calcule_isolation_baie} | {@linkcode set_isolation_paroi} | {@linkcode set_isolation_mur} | {@linkcode set_isolation_plancher_haut} | {@linkcode set_isolation_plancher_bas}
 * @return État d'isolation moyen des parois du local non chauffé donnant sur un espace chauffé
 */
export function calcule_isolation_aiu(props: {
	aiu: number;
	aiu_isole: number;
}): boolean {
	const { aiu, aiu_isole } = props;
	return aiu_isole / aiu >= 0.5;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/39
 * @param props.type_vitrage : {@linkcode set_type_vitrage}
 * @returns État d'isolation de la baie séparant le local non chauffé de l'extérieur
 */
export function calcule_isolation_baie(props: {
	type_vitrage: Enveloppe.Baie.TypeVitrage;
}): boolean {
	const { type_vitrage } = props;
	const scopes: Enveloppe.Baie.TypeVitrage[] = [
		Enveloppe.Baie.TypeVitrageEnum.triple_vitrage,
		Enveloppe.Baie.TypeVitrageEnum.triple_vitrage_fe,
	];
	return scopes.includes(type_vitrage);
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/discussions/48
 * @param props.sst : {@linkcode calcule_sst}
 * @param props.sse : {@linkcode baie.calcule_sse}
 * @param props.bver : {@linkcode calcule_bver}
 * @returns Surface sud équivalente de l'espace tampon solarisé en m²/mois
 */
export function calcule_sse(props: {
	sst: number[];
	sse: number[];
	bver: number;
}): number {
	const bver = props.bver;
	const sst = props.sst.reduce((acc, sst) => acc + sst, 0);
	const sse = props.sse.reduce((acc, sse) => acc + sse, 0);
	return (sst - sse) * bver;
}

/**
 * @param props.surface : Surface de la baie de l'espace tampon solarisé donnant sur l'extérieur en m²/mois
 * @param props.t : {@linkcode calcule_t}
 * @param props.c1 : {@linkcode climat.calcule_c1}
 * @return Surface sud équivalente de la baie de l'espace tampon solarisé donnant sur l'extérieur en m²/mois
 */
export function calcule_sst(props: {
	surface: number;
	t: number;
	c1: number;
}): number {
	const { surface, t, c1 } = props;
	return surface * (0.8 * t + 0.024) * c1;
}

/**
 * @param props.baies : Liste des baies séparant l'espace tampon solarisé de l'extérieur
 * @param props.baies[].surface : Surface de la baie en m²
 * @param props.baies[].t : {@linkcode calcule_t}
 * @returns Coefficient de transparence moyen de l'espace tampon solarisé
 */
export function calcule_tmoy(props: {
	baies: { surface: number; t: number }[];
}): number {
	const { baies } = props;
	const s = baies.reduce((acc, baie) => acc + baie.surface, 0);
	const w = baies.reduce((acc, baie) => acc + baie.surface * baie.t, 0);
	return w / s;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/44
 * @param props.type_vitrage : {@linkcode set_type_vitrage}
 * @param props.materiau : {@linkcode set_materiau}
 * @param props.presence_rupteur_pont_thermique : {@linkcode set_presence_rupteur_pont_thermique}
 * @see abaques.enveloppe.localNonChauffe.t
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de transparence de la baie séparant l'espace tampon solarisé de l'extérieur
 */
export function calcule_t(props: {
	type_vitrage: Enveloppe.Baie.TypeVitrage | null;
	materiau: Enveloppe.Baie.Materiau | null;
	presence_rupteur_pont_thermique: boolean | null;
}): number {
	const type_vitrage =
		props.type_vitrage ?? Enveloppe.Baie.TypeVitrageEnum.simple_vitrage;
	const materiau = props.materiau ?? Enveloppe.Baie.MateriauEnum.pvc;
	const presence_rupteur_pont_thermique =
		props.presence_rupteur_pont_thermique ?? false;
	const abaque = abaques.enveloppe.localNonChauffe.t;
	const query = { type_vitrage, materiau, presence_rupteur_pont_thermique };
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.t;
}

/**
 * @param props.type_vitrage : Type de vitrage de la baie séparant le local non chauffé de l'extérieur saisi
 * @returns Type de vitrage de la baie séparant le local non chauffé de l'extérieur retenu
 */
export function set_type_vitrage(props: {
	type_vitrage: Enveloppe.Baie.TypeVitrage | null;
}): Enveloppe.Baie.TypeVitrage {
	return props.type_vitrage ?? Enveloppe.Baie.TypeVitrageEnum.simple_vitrage;
}

/**
 * @param props.materiau : Matériau de la baie séparant le local non chauffé de l'extérieur saisi
 * @returns Matériau de la baie séparant le local non chauffé de l'extérieur retenu
 */
export function set_materiau(props: {
	materiau: Enveloppe.Baie.Materiau | null;
}): Enveloppe.Baie.Materiau {
	return props.materiau ?? Enveloppe.Baie.MateriauEnum.pvc;
}

/**
 * @param props.presence_rupteur_pont_thermique : Présence d'un rupteur de pont thermique sur la baie séparant le local non chauffé de l'extérieur saisie
 * @return Présence d'un rupteur de pont thermique sur la baie séparant le local non chauffé de l'extérieur retenue
 */
export function set_presence_rupteur_pont_thermique(props: {
	presence_rupteur_pont_thermique: boolean | null;
}): boolean {
	return props.presence_rupteur_pont_thermique ?? false;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/39
 * @param props.isolation : État d'isolation de la paroi séparant le local non chauffé de l'extérieur
 * @return État d'isolation retenu
 */
export function set_isolation_paroi(props: {
	isolation: boolean | null;
}): boolean {
	return props.isolation ? true : false;
}

/**
 * @param props.isolation : État d'isolation saisi du mur séparant le local non chauffé de l'espace chauffé
 * @param props.annee_construction : Année de construction
 * @returns État d'isolation du mur retenu
 */
export function set_isolation_mur(props: {
	isolation: boolean | null;
	annee_construction: number;
}): boolean {
	const { isolation, annee_construction } = props;
	if (isolation !== null) return isolation;
	return annee_construction >= 1975;
}

/**
 * @param props.isolation : État d'isolation saisi du plancher haut séparant le local non chauffé de l'espace chauffé
 * @param props.annee_construction : Année de construction
 * @returns État d'isolation du plancher haut retenu
 */
export function set_isolation_plancher_haut(props: {
	isolation: boolean | null;
	annee_construction: number;
}): boolean {
	const { isolation, annee_construction } = props;
	if (isolation !== null) return isolation;
	return annee_construction >= 1975;
}

/**
 * @param props.isolation : État d'isolation saisi du plancher bas séparant le local non chauffé de l'espace chauffé
 * @param props.annee_construction : Année de construction
 * @returns État d'isolation du plancher bas retenu
 */
export function set_isolation_plancher_bas(props: {
	mitoyennete: Enveloppe.Common.Mitoyennete;
	isolation: boolean | null;
	annee_construction: number;
}): boolean {
	const { mitoyennete, isolation, annee_construction } = props;

	if (isolation !== null) return isolation;

	return mitoyennete === Enveloppe.Common.MitoyenneteEnum.terre_plein
		? annee_construction >= 2001
		: annee_construction >= 1975;
}
