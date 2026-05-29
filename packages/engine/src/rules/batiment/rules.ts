import * as functions from "./functions.js";

export type BatimentResults = {
	ratio_proratisation: ReturnType<typeof functions.calcule_ratio_proratisation>;
};
