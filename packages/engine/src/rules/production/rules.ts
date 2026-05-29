import * as functions from "./functions.js";

export type ProductionResults = {
	ppv: ReturnType<typeof functions.calcule_ppv>;
	celec_ac: ReturnType<typeof functions.calcule_celec_ac>;
	celec_autres: ReturnType<typeof functions.calcule_celec_autres>;
};
