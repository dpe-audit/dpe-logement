import * as functions from "./functions.js";

export type PontThermiqueResults = {
	pt: ReturnType<typeof functions.calcule_pt>;
	kpt: ReturnType<typeof functions.calcule_kpt>;
};
