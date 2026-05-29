import * as functions from "./functions.js";

export type EnveloppeResults = {
	gv: ReturnType<typeof functions.calcule_gv>;
	ubat: ReturnType<typeof functions.calcule_ubat>;
	dp: ReturnType<typeof functions.calcule_dp>;
	dr: ReturnType<typeof functions.calcule_dr>;
	inertie: ReturnType<typeof functions.calcule_inertie>;
	hperm: ReturnType<typeof functions.calcule_hperm>;
	qvinf: ReturnType<typeof functions.calcule_qvinf>;
	n50: ReturnType<typeof functions.calcule_n50>;
	q4pa: ReturnType<typeof functions.calcule_q4pa>;
	q4paenv: ReturnType<typeof functions.calcule_q4paenv>;
	q4paconv: ReturnType<typeof functions.calcule_q4paconv>;
	isolation_murs_plafonds: ReturnType<typeof functions.calcule_isolation_murs_plafonds>;
	presence_joints: ReturnType<typeof functions.calcule_presence_joints>;
	sse: ReturnType<typeof functions.calcule_sse>;
};
