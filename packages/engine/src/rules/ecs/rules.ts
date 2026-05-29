import * as functions from "./functions.js";

export type EcsResults = {
	cecs: ReturnType<typeof functions.calcule_cecs>;
	cecs_elec: ReturnType<typeof functions.calcule_cecs_elec>;
	caux_gen: ReturnType<typeof functions.calcule_caux_gen>;
	caux_dist: ReturnType<typeof functions.calcule_caux_dist>;
	becs: ReturnType<typeof functions.calcule_becs>;
	nadeq: ReturnType<typeof functions.calcule_nadeq>;
	nmax: ReturnType<typeof functions.calcule_nmax>;
};
