import * as functions from "./functions.js";

export type InstallationResults = {
	bch: ReturnType<typeof functions.calcule_bch>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	configuration: ReturnType<typeof functions.calcule_configuration>;
	pch: ReturnType<typeof functions.calcule_pch>;
	pch_ind: ReturnType<typeof functions.calcule_pch_ind>;
	pch_coll: ReturnType<typeof functions.calcule_pch_coll>;
	int: ReturnType<typeof functions.calcule_int>;
	fch: ReturnType<typeof functions.calcule_fch>;
};
