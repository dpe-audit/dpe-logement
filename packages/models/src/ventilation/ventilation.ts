import type{ Consommations } from "../common/common.js";
import type{ NonEmptyArray } from "../utils.js";
import type{ Installation } from "./installation.js";

/**
 * @see https://schemas.open-dpe.fr/ventilation
 */
export type Ventilation = {
	installations: NonEmptyArray<Installation>;
};

export type VentilationWithData<T extends Ventilation = Ventilation> = T & {
	data: VentilationData;
};

export type VentilationData = {
	qvarep_conv: number;
	qvasouf_conv: number;
	smea_conv: number;
	consommations: Consommations;
};
