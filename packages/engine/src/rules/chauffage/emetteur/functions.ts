import { Chauffage } from "@open-dpe-logement/models";

/**
 * @param props.type_emetteur : Type d'émetteur
 * @return Perte de charge de l'émetteur (=en kPa
 */
export function calcule_delta_pem(props: {
	type_emetteur: Chauffage.Emetteur.TypeEmetteur;
}): number {
	const { type_emetteur } = props;
	switch (type_emetteur) {
		case Chauffage.Emetteur.TypeEmetteurEnum.plancher_chauffant:
		case Chauffage.Emetteur.TypeEmetteurEnum.plafond_chauffant:
			return 15;
		case Chauffage.Emetteur.TypeEmetteurEnum.radiateur_monotube:
			return 30;
		case Chauffage.Emetteur.TypeEmetteurEnum.radiateur_bitube:
		case Chauffage.Emetteur.TypeEmetteurEnum.radiateur:
			return 10;
		case Chauffage.Emetteur.TypeEmetteurEnum.autres:
			return 35;
	}
}

/**
 * @param props.type_emetteur : Type d'émetteur
 * @returns Coefficient non décrit
 */
export function calcule_fcot(props: {
	type_emetteur: Chauffage.Emetteur.TypeEmetteur;
}): number {
	const { type_emetteur } = props;
	switch (type_emetteur) {
		case Chauffage.Emetteur.TypeEmetteurEnum.plancher_chauffant:
			return 0.156;
		default:
			return 0.802;
	}
}

/**
 * @param props.temperature_distribution : {@linkcode set_temperature_distribution}
 * @return Chute nominale de température de dimensionnement en °C
 */
export function calcule_dtheta_dim(props: {
	temperature_distribution: Chauffage.Emetteur.TemperatureDistribution;
}): number {
	const { temperature_distribution } = props;
	switch (temperature_distribution) {
		case Chauffage.Emetteur.TemperatureDistributionEnum.haute:
			return 15;
		default:
			return 7.5;
	}
}

/**
 * @param props.temperature_distribution : Température de distribution de l'émetteur de chauffage saisie
 * @return Température de distribution de l'émetteur de chauffage retenue
 */
export function set_temperature_distribution(props: {
	temperature_distribution: Chauffage.Emetteur.TemperatureDistribution | null;
}): Chauffage.Emetteur.TemperatureDistribution {
	const { temperature_distribution } = props;
	return (
		temperature_distribution ??
		Chauffage.Emetteur.TemperatureDistributionEnum.haute
	);
}

/**
 * @param props.annee_installation : Année d'installation de l'émetteur de chauffage saisie
 * @param props.annee_construction_batiment : Année de construction du bâtiment
 * @return Année d'installation de l'émetteur de chauffage retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}
