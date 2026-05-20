import { abaques } from "@open-dpe-logement/abaques";
import { Ventilation } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";

/**
 * @param props.surface_installation : Surface de l'installation de ventilation en m²
 * @param props.surface_installations : Surface totale des installations de ventilation en m²
 * @returns Ratio de dimensionnement de l'installation de ventilation
 */
export function calcule_rdim(props: {
	surface_installation: number;
	surface_installations: number;
}): number {
	const { surface_installation, surface_installations } = props;
	return surface_installation / surface_installations;
}

/**
 * Débit volumique conventionnel à reprendre en m3/(h.m²)
 */
export type qvarep_conv = number;
/**
 * Débit volumique conventionnel à souffler en m3/(h.m²)
 */
export type qvasouf_conv = number;
/**
 * Somme des modules d'entrée d'air sous 20 Pa en m3/(h.m²)
 */
export type smea_conv = number;

/**
 * @param props.type_ventilation : {@linkcode set_type_ventilation}
 * @param props.presence_echangeur_thermique : {@linkcode set_presence_echangeur_thermique}
 * @param props.installation_collective : Installation collective ou individuelle
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @see abaques.ventilation.debits
 * @throws {ValeurForfaitaireError}
 * @returns Débits conventionnels de l'installation de ventilation
 * - {@linkcode qvarep_conv}
 * - {@linkcode qvasouf_conv}
 * - {@linkcode smea_conv}
 */
export function calcule_debits(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation;
	presence_echangeur_thermique: boolean | null;
	installation_collective: boolean | null;
	annee_installation: number | null;
}): {
	qvarep_conv: number;
	qvasouf_conv: number;
	smea_conv: number;
} {
	const abaque = abaques.ventilation.debits;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);

	return {
		smea_conv: match.smea_conv,
		qvarep_conv: match.qvarep_conv,
		qvasouf_conv: match.qvasouf_conv,
	};
}

/**
 * @param props.rdim : {@linkcode calcule_rdim}
 * @param props.qvarep_conv : {@linkcode calcule_debits}
 * @param props.sh : Surface habitable en m²
 * @returns Déperditions thermiques par renouvellement d'air due au système de ventilation en W/K
 */
export function calcule_hvent(props: {
	rdim: number;
	qvarep_conv: number;
	sh: number;
}): number {
	const { rdim, qvarep_conv, sh } = props;
	return 0.34 * qvarep_conv * sh * rdim;
}

/**
 * @param props.type_ventilation : Type de ventilation saisi
 * @returns Type de ventilation retenu
 */
export function set_type_ventilation(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation | null;
}): Ventilation.Installation.TypeVentilation {
	const { type_ventilation } = props;
	return (
		type_ventilation ??
		Ventilation.Installation.TypeVentilationEnum.ventilation_ouverture_fenetres
	);
}

/**
 * @param props.annee_installation : Année d'installation du système de ventilation saisie
 * @param props.annee_construction_batiment : Année de construction du bâtiment
 * @return Année d'installation du système de ventilation retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}

/**
 * @param props.presence_echangeur_thermique : Présence d'un échangeur thermique saisie
 * @returns Présence d'un échangeur thermique retenue
 */
export function set_presence_echangeur_thermique(props: {
	presence_echangeur_thermique: boolean | null;
}): boolean {
	const { presence_echangeur_thermique } = props;
	return presence_echangeur_thermique ?? false;
}
