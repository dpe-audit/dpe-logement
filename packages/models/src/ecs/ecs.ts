import type { Consommations, Pertes } from "../common/common.js";
import type { NonEmptyArray } from "../utils.js";
import type { Generateur } from "./generateur.js";
import type { Installation } from "./installation.js";

/**
 * @see https://schemas.open-dpe.fr/ecs
 */
export type Ecs = {
	generateurs: NonEmptyArray<Generateur>;
	installations: NonEmptyArray<Installation>;
};

export type EcsWithData<T extends Ecs = Ecs> = T & {
	data: EcsData;
};

export type EcsData = {
	nmax: number;
	nadeq: number;
	bef: number;
	iecs: number;
	rd: number;
	rs: number;
	rg: number;
	rgs: number;
	pertes: Pertes;
	consommations: Consommations;
};
