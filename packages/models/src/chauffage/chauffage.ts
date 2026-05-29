import type { Consommations, Pertes } from "../common/common.js";
import { buildEnum, type NonEmptyArray } from "../utils.js";
import type { Generateur } from "./generateur.js";
import type { Installation } from "./installation.js";

/**
 * @see https://schemas.open-dpe.fr/chauffage
 */
export type Chauffage = {
	generateurs: NonEmptyArray<Generateur>;
	installations: NonEmptyArray<Installation>;
};

export type ChauffageWithData<T extends Chauffage = Chauffage> = T & {
	data: ChauffageData;
};

export type ChauffageData = {
	f: number;
	as: number;
	ai: number;
	bef: number;
	ich: number;
	pertes: Pertes;
	consommations: Consommations;
};

export const TAUX_CHARGE = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95] as const;
export type TauxCharge = (typeof TAUX_CHARGE)[number];
export const TauxChargeEnum = buildEnum(TAUX_CHARGE);
export type ParTauxCharge<T> = Record<TauxCharge, T>;
