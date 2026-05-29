import * as functions from "./functions.js";

export type GenerateurResults = {
	cfr: ReturnType<typeof functions.calcule_cfr>;
	caux: ReturnType<typeof functions.calcule_caux>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	eer: ReturnType<typeof functions.calcule_eer>;
};
