import type { Consommations, UUID } from "../common/common.js";
import { buildEnum, type NonEmptyArray } from "../utils.js";

/**
 * @see https://schemas.open-dpe.fr/chauffage/installation
 */
export type Installation = {
	id: UUID;
	description: string;
	surface: number;
	comptage_individuel: boolean;
	reseau: Reseau | null;
	solaire_thermique: SolaireThermique | null;
	regulation_centrale: Regulation;
	regulation_terminale: Regulation;
	generateurs: NonEmptyArray<UUID>;
};

export type InstallationWithData<T extends Installation = Installation> = T & {
	data: InstallationData;
};

export type InstallationData = {
	paux: number;
	rdim: number;
	fch: number;
	int: number;
	i0: number;
	ich: number;
	rd: number;
	re: number;
	rg: number;
	rr: number;
	consommations: Consommations;
};

export type Reseau = ReseauHydraulique | ReseauAeraulique;

type ReseauBase = {
	type_distribution: TypeDistribution;
	presence_fluide_frigorigene: boolean;
	presence_circulateur_externe: boolean;
	niveaux_desservis: number;
	isolation: boolean | null;
	emetteurs: UUID[];
};

export type ReseauHydraulique = ReseauBase & {
	type_distribution: typeof TypeDistributionEnum.hydraulique;
	emetteurs: NonEmptyArray<UUID>;
};

export type ReseauAeraulique = ReseauBase & {
	type_distribution: typeof TypeDistributionEnum.aeraulique;
	emetteurs: [];
};

export type SolaireThermique = {
	usage: UsageSolaire;
	annee_installation: number | null;
	fch: number | null;
};

export type Regulation = SansRegulation | AvecRegulation;

type RegulationBase = {
	presence_regulation: boolean;
	minimum_temperature: boolean | null;
	detection_presence: boolean | null;
};

export type SansRegulation = RegulationBase & {
	presence_regulation: false;
	minimum_temperature: null | false;
	detection_presence: null | false;
};

export type AvecRegulation = RegulationBase & {
	presence_regulation: true;
	minimum_temperature: boolean;
	detection_presence: boolean;
};

export const TYPES_DISTRIBUTION = ["hydraulique", "aeraulique"] as const;
export type TypeDistribution = (typeof TYPES_DISTRIBUTION)[number];
export const TypeDistributionEnum = buildEnum(TYPES_DISTRIBUTION);

export const USAGES_SOLAIRE = ["chauffage", "chauffage_ecs"] as const;
export type UsageSolaire = (typeof USAGES_SOLAIRE)[number];
export const UsageSolaireEnum = buildEnum(USAGES_SOLAIRE);
