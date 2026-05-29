import * as functions from "./functions.js";

export type MasqueResults = {
	fe1: ReturnType<typeof functions.calcule_fe1>;
	fe2: ReturnType<typeof functions.calcule_fe2>;
	omb: ReturnType<typeof functions.calcule_omb>;
};
