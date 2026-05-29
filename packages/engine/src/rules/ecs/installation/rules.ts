import * as functions from "./functions.js";

export type InstallationResults = {
	becs: ReturnType<typeof functions.calcule_becs>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	fecs: ReturnType<typeof functions.calcule_fecs>;
	qdw: ReturnType<typeof functions.calcule_qdw>;
	qdw_ind_vc: ReturnType<typeof functions.calcule_qdw_ind_vc>;
	qdw_col_vc: ReturnType<typeof functions.calcule_qdw_col_vc>;
	qdw_col_hvc: ReturnType<typeof functions.calcule_qdw_col_hvc>;
};
