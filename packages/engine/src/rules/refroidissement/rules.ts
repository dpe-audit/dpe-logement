import * as functions from "./functions.js";

export type RefroidissementResults = {
	cfr: ReturnType<typeof functions.calcule_cfr>;
	cfr_elec: ReturnType<typeof functions.calcule_cfr_elec>;
	caux: ReturnType<typeof functions.calcule_caux>;
	bfr: ReturnType<typeof functions.calcule_bfr>;
	fut: ReturnType<typeof functions.calcule_fut>;
	rbth: ReturnType<typeof functions.calcule_rbth>;
	as: ReturnType<typeof functions.calcule_as>;
	ai: ReturnType<typeof functions.calcule_ai>;
	e: ReturnType<typeof functions.calcule_e>;
	textmoy: ReturnType<typeof functions.calcule_textmoy>;
	nref: ReturnType<typeof functions.calcule_nref>;
	tint: ReturnType<typeof functions.calcule_tint>;
	t: ReturnType<typeof functions.calcule_t>;
	cin: ReturnType<typeof functions.calcule_cin>;
};
