import type { Consommations, Pertes, UUID } from "../common/common.js";
import { buildEnum, type NonEmptyArray } from "../utils.js";

/**
 * @see https://schemas.open-dpe.fr/ecs/installation
 */
export type Installation = {
	id: UUID;
	description: string;
	surface: number;
	generateurs: NonEmptyArray<UUID>;
	reseau: Reseau;
	stockage: Stockage | null;
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

export type Reseau = {
	alimentation_contigue: boolean;
	niveaux_desservis: number;
	isolation: boolean | null;
	bouclage: Bouclage | null;
};

export type Stockage = {
	volume: number | null;
	position_volume_chauffe: boolean;
};

export type SolaireThermique = {
	usage: Usage;
	annee_installation: number | null;
	fecs: number | null;
};

export const BOUCLAGES = ["non_boucle", "boucle", "trace"] as const;
export type Bouclage = (typeof BOUCLAGES)[number];
export const BouclageEnum = buildEnum(BOUCLAGES);

export const USAGES_SOLAIRE = ["ecs", "chauffage_ecs"] as const;
export type Usage = (typeof USAGES_SOLAIRE)[number];
export const UsageEnum = buildEnum(USAGES_SOLAIRE);
