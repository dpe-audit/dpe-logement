import * as functions from "./functions.js";

export type SystemeResults = {
	cecs: ReturnType<typeof functions.calcule_cecs>;
	caux_dist: ReturnType<typeof functions.calcule_caux_dist>;
	qcirb: ReturnType<typeof functions.calcule_qcirb>;
	qtrac: ReturnType<typeof functions.calcule_qtrac>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	iecs: ReturnType<typeof functions.calcule_iecs>;
	rd: ReturnType<typeof functions.calcule_rd>;
	rg: ReturnType<typeof functions.calcule_rgs>["rg"];
	rs: ReturnType<typeof functions.calcule_rgs>["rs"];
	rgs: ReturnType<typeof functions.calcule_rgs>["rgs"];
};
