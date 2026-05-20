import type { Consommations, Pertes, UUID } from "../common/common.js";
import { buildEnum } from "../utils.js";

/**
 * @see https://schemas.open-dpe.fr/ecs/installation
 */
export type Installation = {
	id: UUID;
	description: string;
	surface: number;
	systemes: [UUID] | [UUID, UUID];
	solaire_thermique: SolaireThermique | null;
};

export type InstallationWithData<T extends Installation = Installation> = T & {
	data: InstallationData;
};

export type InstallationData = {
	paux: number;
	rdim: number;
	fecs: number;
	iecs: number;
	rd: number;
	rs: number;
	rg: number;
	rgs: number;
	pertes: Pertes;
	consommations: Consommations;
};

export type SolaireThermique = {
	usage: UsageSolaire;
	annee_installation: number | null;
	fecs: number | null;
};

export const USAGES_SOLAIRE = ["ecs", "chauffage_ecs"] as const;
export type UsageSolaire = (typeof USAGES_SOLAIRE)[number];
export const UsageSolaireEnum = buildEnum(USAGES_SOLAIRE);
