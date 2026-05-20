import { abaques } from "@open-dpe-logement/abaques";
import { Enveloppe, type Common } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";

/**
 * @param props.type_masque : Type de masque proche
 * @param props.orientation_facade : Orientation de la façade
 * @param props.avancee_masque : Avancée du masque en mètres
 * @see abaques.enveloppe.masque.fe1
 * @throws {ValeurForfaitaireError}
 * @returns Facteur d'ensoleillement du masque proche
 */
export function calcule_fe1(props: {
	type_masque: Exclude<
		Enveloppe.Masque.TypeMasque,
		| typeof Enveloppe.Masque.TypeMasqueEnum.homogene
		| typeof Enveloppe.Masque.TypeMasqueEnum.non_homogene
	>;
	orientation_facade: Common.OrientationCardinale;
	avancee_masque: number | null;
}): number {
	const abaque = abaques.enveloppe.masque.fe1;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.fe1;
}

/**
 * @param props.orientation_facade : Orientation de la façade
 * @param props.hauteur_masque_alpha : Hauteur angulaire du masque en degrés
 * @see abaques.enveloppe.masque.fe2
 * @throws {ValeurForfaitaireError}
 * @returns Facteur d'ensoleillement du masque lointain homogène
 */
export function calcule_fe2(props: {
	orientation_facade: Common.OrientationCardinale;
	hauteur_masque_alpha: number;
}): number {
	const abaque = abaques.enveloppe.masque.fe2;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.fe2;
}

/**
 * @param props.orientation_facade : Orientation de la façade
 * @param props.secteur_orientation : Secteur d'orientation
 * @param props.hauteur_masque_alpha : Hauteur angulaire du masque en degrés
 * @see abaques.enveloppe.masque.omb
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient d'ombrage du masque lointain non homogène
 */
export function calcule_omb(props: {
	orientation_facade: Common.OrientationCardinale;
	secteur_orientation: Enveloppe.Masque.Secteur;
	hauteur_masque_alpha: number;
}): number {
	const abaque = abaques.enveloppe.masque.omb;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.omb;
}
