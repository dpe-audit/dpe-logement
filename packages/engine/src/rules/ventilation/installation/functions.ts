import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Ventilation } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";

/**
 * @param props.rdim - {@linkcode calcule_rdim}
 * @param props.pvent_moy - {@linkcode calcule_pvent_moy}
 * @param props.rut - {@linkcode calcule_rut}
 * @returns Consommation de l'auxiliaire de ventilation en kWh/an
 */
export function calcule_caux(props: {
	rdim: number;
	pvent_moy: number;
	rut: number;
}): number {
	const { rdim, pvent_moy, rut } = props;
	return 8760 * (pvent_moy / 1000) * rut * rdim;
}

/**
 * @param props.type_batiment - Type de bâtiment
 * @param props.type_ventilation - {@linkcode set_type_ventilation}
 * @param props.annee_installation - {@linkcode set_annee_installation}
 * @param props.surface_installation - Surface de l'installation de ventilation en m²
 * @param props.qvarep_conv - {@linkcode calcule_debits}
 * @returns Puissance moyenne de l'auxiliaire de ventilation en W
 */
export function calcule_pvent_moy(props: {
	type_batiment: Batiment.TypeBatiment;
	type_ventilation: Ventilation.Installation.TypeVentilation;
	annee_installation: number | null;
	surface_installation: number;
	qvarep_conv: number;
}): number {
	const { type_batiment, type_ventilation } = props;

	// Cas des ventilations naturelles
	if (Ventilation.Installation.isVentilationNaturelle(type_ventilation)) {
		return 0;
	}
	// Cas des ventilations mécaniques
	switch (type_batiment) {
		case Batiment.TypeBatimentEnum.maison:
			return calcule_pvent_moy_maison(props);
		case Batiment.TypeBatimentEnum.immeuble:
			return calcule_pvent_moy_immeuble(props);
	}
}

/**
 * @param props.type_ventilation - {@linkcode set_type_ventilation}
 * @param props.annee_installation - {@linkcode set_annee_installation}
 * @see abaques.ventilation.pventMoy
 * @throws {ValeurForfaitaireError}
 * @returns Puissance moyenne de l'auxiliaire de ventilation pour une maison individuelle en W
 */
export function calcule_pvent_moy_maison(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation;
	annee_installation: number | null;
}): number {
	const abaque = abaques.ventilation.pventMoy;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.pvent_moy;
}

/**
 * @param props.type_ventilation - {@linkcode set_type_ventilation}
 * @param props.annee_installation - {@linkcode set_annee_installation}
 * @param props.surface_installation - Surface de l'installation de ventilation en m²
 * @param props.qvarep_conv - {@linkcode calcule_debits}
 * @see abaques.ventilation.pvent
 * @throws {ValeurForfaitaireError}
 * @returns Puissance moyenne de l'auxiliaire de ventilation pour un immeuble en W
 */
export function calcule_pvent_moy_immeuble(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation;
	annee_installation: number | null;
	surface_installation: number;
	qvarep_conv: number;
}): number {
	const { surface_installation, qvarep_conv, ...query } = props;
	const abaque = abaques.ventilation.pvent;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.pvent * qvarep_conv * surface_installation;
}

/**
 * @param props.type_ventilation - {@linkcode set_type_ventilation}
 * @param props.generateur_collectif - Présence d'un générateur collectif (ex : VMC collective)
 * @returns Ratio du temps d'utilisation du mode mécanique de l'auxiliaire de ventilation
 */
export function calcule_rut(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation;
	generateur_collectif: boolean | null;
}): number {
	const { type_ventilation, generateur_collectif } = props;

	// Cas des ventilations naturelles
	if (Ventilation.Installation.isVentilationNaturelle(type_ventilation)) {
		return 0;
	}
	const scope: Ventilation.Installation.TypeVentilation[] = [
		Ventilation.Installation.TypeVentilationEnum.ventilation_hybride,
		Ventilation.Installation.TypeVentilationEnum
			.ventilation_hybride_entrees_air_hygroreglables,
	];
	// Cas des ventilations mécaniques hybrides
	if (false === scope.includes(type_ventilation)) return 1;
	// Autres cas de ventilations mécaniques
	return generateur_collectif ? 0.167 : 0.083;
}
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

export type Debits = {
	// Débit volumique conventionnel à reprendre en m3/(h.m²)
	qvarep_conv: number;
	// Débit volumique conventionnel à souffler en m3/(h.m²)
	qvasouf_conv: number;
	// Somme des modules d'entrée d'air sous 20 Pa en m3/(h.m²)
	smea_conv: number;
};

/**
 * @param props.type_ventilation : {@linkcode set_type_ventilation}
 * @param props.presence_echangeur_thermique : {@linkcode set_presence_echangeur_thermique}
 * @param props.installation_collective : Installation collective ou individuelle
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @see abaques.ventilation.debits
 * @throws {ValeurForfaitaireError}
 * @returns Débits conventionnels de l'installation de ventilation
 */
export function calcule_debits(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation;
	presence_echangeur_thermique: boolean | null;
	installation_collective: boolean | null;
	annee_installation: number | null;
}): Debits {
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
