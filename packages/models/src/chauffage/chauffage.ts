import type { Consommations, Pertes } from "../common/common.js";
import type { NonEmptyArray } from "../utils.js";
import type { Emetteur } from "./emetteur.js";
import type { Generateur } from "./generateur.js";
import type { Installation } from "./installation.js";

/**
 * @see https://schemas.open-dpe.fr/chauffage
 */
export type Chauffage = {
	emetteurs: Emetteur[];
	generateurs: NonEmptyArray<Generateur>;
	installations: NonEmptyArray<Installation>;
};

export type ChauffageWithData<T extends Chauffage = Chauffage> = T & {
	data: ChauffageData;
};

export type ChauffageData = {
	f: number;
	apports: number;
	apports_solaires: number;
	apports_internes: number;
	bef: number;
	ich: number;
	rd: number;
	re: number;
	rg: number;
	rr: number;
	pertes: Pertes;
	consommations: Consommations;
};
