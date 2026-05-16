import type { Consommations } from "../common/common.js";
import type { Generateur } from "./generateur.js";
import type { Installation } from "./installation.js";

/**
 * @see https://schemas.open-dpe.fr/refroidissement
 */
export type Refroidissement = {
	generateurs: Generateur[];
	installations: Installation[];
};

export type RefroidissementWithData<
	T extends Refroidissement = Refroidissement,
> = T & {
	data: RefroidissementData;
};

export type RefroidissementData = {
	apports: number;
	apports_internes: number;
	apports_solaires: number;
	bef: number;
	consommations: Consommations;
};
