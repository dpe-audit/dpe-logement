import * as functions from "./functions.js";

export type MurResults = {
	u: ReturnType<typeof functions.calcule_u>;
	u0: ReturnType<typeof functions.calcule_u0>;
};
