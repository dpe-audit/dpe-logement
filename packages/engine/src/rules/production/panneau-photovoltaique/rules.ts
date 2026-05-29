import * as functions from "./functions.js";

export type PanneauPhotovoltaiqueResults = {
	ppv: ReturnType<typeof functions.calcule_ppv>;
	spv: ReturnType<typeof functions.calcule_spv>;
	kpv: ReturnType<typeof functions.calcule_kpv>;
	epv: ReturnType<typeof functions.calcule_epv>;
};
