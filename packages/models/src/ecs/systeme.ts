import type { Consommations, Pertes, UUID } from "../common/common.js";
import { buildEnum } from "../utils.js";

/**
 * @see https://schemas.open-dpe.fr/ecs/systeme
 */
export type Systeme = {
	id: UUID;
	description: string;
	generateur_id: UUID;
	installation_id: UUID;
	reseau: Reseau;
};

export type SystemeWithData<T extends Systeme = Systeme> = T & {
	data: SystemeData;
};

export type SystemeData = {
	paux: number;
	rdim: number;
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

export const BOUCLAGES = ["non_boucle", "boucle", "trace"] as const;
export type Bouclage = (typeof BOUCLAGES)[number];
export const BouclageEnum = buildEnum(BOUCLAGES);
