import * as functions from "./functions.js";

export type ParoiResults = {
	sdep: ReturnType<typeof functions.calcule_sdep>;
	b: ReturnType<typeof functions.calcule_b>;
	bver: ReturnType<typeof functions.calcule_bver>;
	dp: ReturnType<typeof functions.calcule_dp>;
};
