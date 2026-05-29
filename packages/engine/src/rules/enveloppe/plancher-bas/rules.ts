import * as functions from "./functions.js";

export type PlancherBasResults = {
	u: ReturnType<typeof functions.calcule_u>;
	ue: ReturnType<typeof functions.calcule_ue>;
	ue_applicable: ReturnType<typeof functions.calcule_ue_applicable>;
	u0: ReturnType<typeof functions.calcule_u0>;
};
