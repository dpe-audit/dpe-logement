import { Batiment, Common, Ventilation } from "@open-dpe-logement/models";
import { abaques } from "@open-dpe-logement/abaques";
import toCEP from "../../../utils/to-cep";
import toEGES from "../../../utils/to-eges";

/**
 * @params props.rdim - Ratio de dimensionnement de l'installation de ventilation
 * @params props.pvent_moy - Puissance moyenne de l'auxiliaire de ventilation en W
 * @params props.rut - Ratio du temps d'utilisation du mode mécanique de l'auxiliaire de ventilation
 * @returns Consommation d'énergie finale de l'auxiliaire de ventilation en kWh/an
 */
export function cef(props: {
	rdim: number;
	pvent_moy: number;
	rut: number;
}): number {
	const { rdim, pvent_moy, rut } = props;
	return 8760 * (pvent_moy / 1000) * rut * rdim;
}

/**
 * @params props.cef - Consommation d'énergie finale de l'auxiliaire de ventilation en kWh/an
 * @return Consommation d'énergie primaire de l'auxiliaire de ventilation en kWh/an
 */
export function cep(props: { cef: number }): number {
	const { cef } = props;
	const energie = Common.EnergieEnum.electricite;
	return toCEP({ cef, energie });
}

/**
 * @params props.cef - Consommation d'énergie finale de l'auxiliaire de ventilation en kWh/an
 * @return Emissions de gaz à effet de serre de l'auxiliaire de ventilation en kgCO2eq/an
 */
export function eges(props: { cef: number }): number {
	const { cef } = props;
	const energie = Common.EnergieEnum.electricite;
	const usage = Common.UsageEnum.auxiliaire;
	return toEGES({ cef, energie, usage });
}

/**
 * @params props.type_batiment - Type de bâtiment
 * @params props.type_installation - Type d'installation de ventilation
 * @params props.annee_installation - Année d'installation
 * @params props.surface_installation - Surface de l'installation de ventilation en m²
 * @params props.qvarep_conv - Débit volumique conventionnel à reprendre en m3/(h.m²)
 *
 * @oneof
 * - pvent_moy_maison -> Maison individuelle
 * - pvent_moy_immeuble -> Immeuble
 *
 * @returns Puissance moyenne de l'auxiliaire de ventilation en W
 */
export function pvent_moy(props: {
	type_batiment: Batiment.TypeBatiment;
	type_installation: Ventilation.Installation.TypeVentilation;
	annee_installation: number | null;
	surface_installation: number;
	qvarep_conv: number;
}): number {
	const { type_batiment, type_installation } = props;

	// Cas des ventilations naturelles
	if (Ventilation.Installation.isVentilationNaturelle(type_installation)) {
		return 0;
	}
	// Cas des ventilations mécaniques
	switch (type_batiment) {
		case Batiment.TypeBatimentEnum.maison:
			return pvent_moy_maison(props);
		case Batiment.TypeBatimentEnum.immeuble:
			return pvent_moy_immeuble(props);
	}
}

/**
 * @params props.type_installation - Type d'installation de ventilation
 * @params props.annee_installation - Année d'installation
 * @throws {Error} Aucune correspondance trouvée dans l'abaque ventilation.pventMoy
 * @returns Puissance moyenne de l'auxiliaire de ventilation pour une maison individuelle en W
 */
export function pvent_moy_maison(props: {
	type_installation: Ventilation.Installation.TypeVentilation;
	annee_installation: number | null;
}): number {
	const { type_installation, annee_installation } = props;
	const abaque = abaques.ventilation.pventMoy;
	const query = { type_installation, annee_installation };
	const match = abaque.search(query, abaque.load()).at(0);

	if (!match) {
		const message = `Aucune correspondance trouvée pour la requête ${JSON.stringify(query)} dans l'abaque ventilation.pventMoy`;
		throw new Error(message);
	}
	return match.pvent_moy;
}

/**
 * @params props.type_installation - Type d'installation de ventilation
 * @params props.annee_installation - Année d'installation
 * @params props.surface_installation - Surface de l'installation de ventilation en m²
 * @params props.qvarep_conv - Débit volumique conventionnel à reprendre en m3/(h.m²)
 * @throws {Error} Aucune correspondance trouvée dans l'abaque ventilation.pvent
 * @returns Puissance moyenne de l'auxiliaire de ventilation pour un immeuble en W
 */
export function pvent_moy_immeuble(props: {
	type_installation: Ventilation.Installation.TypeVentilation;
	annee_installation: number | null;
	surface_installation: number;
	qvarep_conv: number;
}): number {
	const {
		type_installation,
		annee_installation,
		surface_installation,
		qvarep_conv,
	} = props;
	const abaque = abaques.ventilation.pvent;
	const query = { type_installation, annee_installation };
	const match = abaque.search(query, abaque.load()).at(0);

	if (!match) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	const pvent = match.pvent;
	return pvent * qvarep_conv * surface_installation;
}

/**
 * @params props.type_installation - Type d'installation de ventilation
 * @params props.generateur_collectif - Présence d'un générateur collectif (ex : VMC collective)
 * @returns Ratio du temps d'utilisation du mode mécanique de l'auxiliaire de ventilation
 */
export function rut(props: {
	type_installation: Ventilation.Installation.TypeVentilation;
	generateur_collectif: boolean | null;
}): number {
	const { type_installation, generateur_collectif } = props;

	// Cas des ventilations naturelles
	if (Ventilation.Installation.isVentilationNaturelle(type_installation)) {
		return 0;
	}
	const scope: Ventilation.Installation.TypeVentilation[] = [
		Ventilation.Installation.TypeVentilationEnum.ventilation_hybride,
		Ventilation.Installation.TypeVentilationEnum
			.ventilation_hybride_entrees_air_hygroreglables,
	];
	// Cas des ventilations mécaniques hybrides
	if (false === scope.includes(type_installation)) return 1;
	// Autres cas de ventilations mécaniques
	return generateur_collectif ? 0.167 : 0.083;
}
