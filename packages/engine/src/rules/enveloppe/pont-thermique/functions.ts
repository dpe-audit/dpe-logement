import { ValeurForfaitaireError } from "#utils/errors.js";
import { abaques } from "@open-dpe-logement/abaques";
import { Enveloppe } from "@open-dpe-logement/models";

/**
 * @param props.type_liaison : Type de liaison
 * @param props.kpt : {@linkcode calcule_kpt}
 * @param props.l : Longueur du pont thermique en m
 * @param props.pont_thermique_partiel : Indique si le pont thermique est partiel ou total
 * @returns Valeur du pont thermique en W/(m.K)
 */
export function calcule_pt(props: {
	type_liaison: Enveloppe.PontThermique.TypeLiaison;
	kpt: number;
	l: number;
	pont_thermique_partiel: boolean;
}): number {
	const { type_liaison, kpt, l, pont_thermique_partiel } = props;
	const c = pont_thermique_partiel ? 0.5 : 1;

	switch (type_liaison) {
		case Enveloppe.PontThermique.TypeLiaisonEnum.refend_mur:
			return c * l * kpt;
		case Enveloppe.PontThermique.TypeLiaisonEnum.plancher_intermediaire_mur:
			return c * l * kpt;
		default:
			return l * kpt;
	}
}

/**
 * @param props.kpt_saisi : Valeur du pont thermique saisie en W/(m.K)
 * @param props.type_liaison : Type de liaison
 * @param props.isolation_mur : {@linkcode set_isolation_mur}
 * @param props.type_isolation_mur : {@linkcode set_type_isolation_mur}
 * @param props.isolation_plancher : {@linkcode set_isolation_plancher_bas} | {@linkcode set_isolation_plancher_haut}
 * @param props.type_isolation_plancher : {@linkcode set_type_isolation_plancher_bas} | {@linkcode set_type_isolation_plancher_haut}
 * @param props.type_pose_menuiserie : Type de pose de la menuiserie
 * @param props.presence_retour_isolation : {@linkcode set_presence_retour_isolation}
 * @param props.largeur_dormant : {@linkcode set_largeur_dormant}
 * @see abaques.enveloppe.pontThermique.kpt
 * @throws ValeurForfaitaireError
 * @returns Valeur du pont thermique en W/(m.K)
 */
export function calcule_kpt(props: {
	kpt_saisi: number | null;
	type_liaison: Enveloppe.PontThermique.TypeLiaison;
	isolation_mur: boolean;
	type_isolation_mur: Enveloppe.Common.TypeIsolation | null;
	isolation_plancher: boolean | null;
	type_isolation_plancher: Enveloppe.Common.TypeIsolation | null;
	type_pose_menuiserie: Enveloppe.Common.TypePose | null;
	presence_retour_isolation: boolean | null;
	largeur_dormant: number | null;
}): number {
	const { kpt_saisi } = props;

	if (kpt_saisi) return kpt_saisi;

	const abaque = abaques.enveloppe.pontThermique.kpt;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.kpt;
}

/**
 * @param props.isolation : État d'isolation du mur saisi
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
 * @param props.isolation : État d'isolation du plancher haut saisi
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
 * @param props.isolation : État d'isolation du plancher bas saisi
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

/**
 * @param props.type_isolation : Type d'isolation du mur saisi
 * @return Type d'isolation du mur retenu
 */
export function set_type_isolation_mur(props: {
	type_isolation: Enveloppe.Common.TypeIsolation | null;
}): Enveloppe.Common.TypeIsolation {
	return props.type_isolation ?? Enveloppe.Common.TypeIsolationEnum.iti;
}

/**
 * @param props.type_isolation : Type d'isolation du plancher haut saisi
 * @return Type d'isolation du plancher haut retenu
 */
export function set_type_isolation_plancher_haut(props: {
	type_isolation: Enveloppe.Common.TypeIsolation | null;
}): Enveloppe.Common.TypeIsolation {
	return props.type_isolation ?? Enveloppe.Common.TypeIsolationEnum.ite;
}

/**
 * @param props.type_isolation : Type d'isolation du plancher bas saisi
 * @return Type d'isolation du plancher bas retenu
 */
export function set_type_isolation_plancher_bas(props: {
	type_isolation: Enveloppe.Common.TypeIsolation | null;
}): Enveloppe.Common.TypeIsolation {
	return props.type_isolation ?? Enveloppe.Common.TypeIsolationEnum.ite;
}

/**
 * @param props.largeur_dormant : Largeur du dormant saisie en mm
 * @return Largeur du dormant retenue en mm
 */
export function set_largeur_dormant(props: {
	largeur_dormant: number | null;
}): number {
	return props.largeur_dormant ?? 50;
}

/**
 * @param props.presence_retour_isolation : Présence d'un retour d'isolation au niveau de la menuiserie saisie
 * @return Présence d'un retour d'isolation au niveau de la menuiserie retenue
 */
export function set_presence_retour_isolation(props: {
	presence_retour_isolation: boolean | null;
}): boolean {
	return props.presence_retour_isolation ?? false;
}
