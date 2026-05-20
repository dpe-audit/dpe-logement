import { Batiment, Common, Ventilation } from "@open-dpe-logement/models";
import { abaques } from "@open-dpe-logement/abaques";
import toCEP from "#utils/to-cep.js";
import toEGES from "#utils/to-eges.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as installation from "#rules/ventilation/installation/functions.js";

/**
 * @param props.rdim - {@linkcode installation.calcule_rdim}
 * @param props.pvent_moy - {@linkcode calcule_pvent_moy}
 * @param props.rut - {@linkcode calcule_rut}
 * @returns Consommation d'énergie finale de l'auxiliaire de ventilation en kWh/an
 */
export function calcule_cef(props: {
	rdim: number;
	pvent_moy: number;
	rut: number;
}): number {
	const { rdim, pvent_moy, rut } = props;
	return 8760 * (pvent_moy / 1000) * rut * rdim;
}

/**
 * @param props.cef_auxiliaire - {@linkcode calcule_cef}
 * @return Consommation d'énergie primaire de l'auxiliaire de ventilation en kWh
 */
export function calcule_cep(props: { cef_auxiliaire: number }): number {
	const { cef_auxiliaire } = props;
	const energie = Common.EnergieEnum.electricite;
	return toCEP({ cef: cef_auxiliaire, energie });
}

/**
 * @param props.cef_auxiliaire - {@linkcode calcule_cef}
 * @return Emissions de gaz à effet de serre de l'auxiliaire de ventilation en kgCO2eq
 */
export function calcule_eges(props: { cef_auxiliaire: number }): number {
	const { cef_auxiliaire } = props;
	const energie = Common.EnergieEnum.electricite;
	const usage = Common.UsageEnum.auxiliaire;
	return toEGES({ cef: cef_auxiliaire, energie, usage });
}

/**
 * @param props.type_batiment - Type de bâtiment
 * @param props.type_ventilation - {@linkcode installation.set_type_ventilation}
 * @param props.annee_installation - {@linkcode installation.set_annee_installation}
 * @param props.surface_installation - Surface de l'installation de ventilation en m²
 * @param props.qvarep_conv - {@linkcode installation.qvarep_conv}
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
 * @param props.type_ventilation - {@linkcode installation.set_type_ventilation}
 * @param props.annee_installation - {@linkcode installation.set_annee_installation}
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
 * @param props.type_ventilation - {@linkcode installation.set_type_ventilation}
 * @param props.annee_installation - {@linkcode installation.set_annee_installation}
 * @param props.surface_installation - Surface de l'installation de ventilation en m²
 * @param props.qvarep_conv - {@linkcode installation.calcule_debits}
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
 * @param props.type_ventilation - {@linkcode installation.set_type_ventilation}
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
