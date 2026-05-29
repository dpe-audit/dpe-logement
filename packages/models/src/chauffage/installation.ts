import type { Consommations, UUID } from "../common/common.js";
import { buildEnum, type NonEmptyArray } from "../utils.js";
import type { Systeme } from "./systeme.js";

/**
 * @see https://schemas.open-dpe.fr/chauffage/installation
 */
export type Installation = {
	id: UUID;
	description: string;
	surface: number;
	type: TypeInstallation;
	installation_collective: boolean;
	comptage_individuel: boolean | null;
	regulation_terminale: boolean | null;
	programmation_centrale: TypeProgrammationCentrale;
	programmation_terminale: TypeProgrammationTerminale | null;
	solaire_thermique: SolaireThermique | null;
	systemes: NonEmptyArray<Systeme>;
};

export type InstallationWithData<T extends Installation = Installation> = T & {
	data: InstallationData;
};

export type InstallationData = {
	rdim: number;
	fch: number;
	int: number;
	i0: number;
	ich: number;
	consommations: Consommations;
};

export type SolaireThermique = {
	usage: UsageSolaire;
	annee_installation: number | null;
	fch: number | null;
};

export const TYPES_INSTALLATION = ["central", "divise"] as const;
export type TypeInstallation = (typeof TYPES_INSTALLATION)[number];
export const TypeInstallationEnum = buildEnum(TYPES_INSTALLATION);

export const TYPES_PROGRAMMATION = [
	"absent",
	"central_sans_minimum_temperature",
	"central_avec_minimum_temperature",
	"central_collectif_sans_detection_presence",
	"central_collectif_avec_detection_presence",
	"terminal_avec_minimum_temperature",
	"terminal_avec_minimum_temperature_detection_presence",
];
export type TypeProgrammation = (typeof TYPES_PROGRAMMATION)[number];
export const TypeProgrammationEnum = buildEnum(TYPES_PROGRAMMATION);

export type TypeProgrammationCentrale = Extract<
	TypeProgrammation,
	| "absent"
	| "central_sans_minimum_temperature"
	| "central_avec_minimum_temperature"
	| "central_collectif_sans_detection_presence"
	| "central_collectif_avec_detection_presence"
>;

export type TypeProgrammationTerminale = Extract<
	TypeProgrammation,
	| "absent"
	| "terminal_avec_minimum_temperature"
	| "terminal_avec_minimum_temperature_detection_presence"
>;

export const USAGES_SOLAIRE = ["chauffage", "chauffage_ecs"] as const;
export type UsageSolaire = (typeof USAGES_SOLAIRE)[number];
export const UsageSolaireEnum = buildEnum(USAGES_SOLAIRE);
