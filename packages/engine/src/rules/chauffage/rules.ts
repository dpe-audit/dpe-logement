import * as functions from "./functions.js";

export type ChauffageResults = {
	cch: ReturnType<typeof functions.calcule_cch>;
	cch_elec: ReturnType<typeof functions.calcule_cch_elec>;
	caux_gen: ReturnType<typeof functions.calcule_caux_gen>;
	caux_dist: ReturnType<typeof functions.calcule_caux_dist>;
	bch: ReturnType<typeof functions.calcule_bch>;
	bch_hp: ReturnType<typeof functions.calcule_bch_hp>;
	bv: ReturnType<typeof functions.calcule_bv>;
	pch: ReturnType<typeof functions.calcule_pch>;
	f: ReturnType<typeof functions.calcule_f>;
	as: ReturnType<typeof functions.calcule_as>;
	ai: ReturnType<typeof functions.calcule_ai>;
	qgw_rec: ReturnType<typeof functions.calcule_qgw_rec>;
	qdw_rec: ReturnType<typeof functions.calcule_qdw_rec>;
	qgen_ecs_rec: ReturnType<typeof functions.calcule_qgen_ecs_rec>;
	effet_joule: ReturnType<typeof functions.calcule_effet_joule>;
	nref: ReturnType<typeof functions.calcule_nref>;
	dh: ReturnType<typeof functions.calcule_dh>;
};
