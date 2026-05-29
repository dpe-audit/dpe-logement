import * as functions from "./functions.js";

export type LocalNonChauffeResults = {
	b: ReturnType<typeof functions.calcule_b>;
	bver: ReturnType<typeof functions.calcule_bver>;
	uvue: ReturnType<typeof functions.calcule_uvue>;
	aue: ReturnType<typeof functions.calcule_aue>;
	aiu: ReturnType<typeof functions.calcule_aiu>;
	isolation_aue: ReturnType<typeof functions.calcule_isolation_aue>;
	isolation_aiu: ReturnType<typeof functions.calcule_isolation_aiu>;
	isolation_baie: ReturnType<typeof functions.calcule_isolation_baie>;
	sse: ReturnType<typeof functions.calcule_sse>;
	sst: ReturnType<typeof functions.calcule_sst>;
	tmoy: ReturnType<typeof functions.calcule_tmoy>;
	t: ReturnType<typeof functions.calcule_t>;
};
