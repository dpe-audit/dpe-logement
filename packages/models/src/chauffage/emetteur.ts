import type { UUID } from "../common/common";
import { buildEnum } from "../utils";

/**
 * @see https://schemas.open-dpe.fr/chauffage/emetteur
 */
export type Emetteur = {
	id: UUID;
	description: string;
	type: TypeEmetteur;
	temperature_distribution: TemperatureDistribution;
	presence_robinet_thermostatique: boolean;
	annee_installation: number | null;
};

export const TYPES_EMETTEUR = [
	"plancher_chauffant",
	"plafond_chauffant",
	"radiateur_monotube",
	"radiateur_bitube",
	"radiateur",
] as const;
export type TypeEmetteur = (typeof TYPES_EMETTEUR)[number];
export const TypeEmetteurEnum = buildEnum(TYPES_EMETTEUR);

export const TEMPERATURE_DISTRIBUTIONS = ["basse", "moyenne", "haute"] as const;
export type TemperatureDistribution =
	(typeof TEMPERATURE_DISTRIBUTIONS)[number];
export const TemperatureDistributionEnum = buildEnum(TEMPERATURE_DISTRIBUTIONS);
