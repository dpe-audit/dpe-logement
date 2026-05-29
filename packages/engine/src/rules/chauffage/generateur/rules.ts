import * as functions from "./functions.js";

export type GenerateurResults = {
	caux: ReturnType<typeof functions.calcule_caux>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	kpcs: ReturnType<typeof functions.calcule_kpcs>;
	pn: ReturnType<typeof functions.calcule_pn>;
	pdim: ReturnType<typeof functions.calcule_pdim>;
	pch: ReturnType<typeof functions.calcule_pch>;
	paux: ReturnType<typeof functions.calcule_paux>;
	rpint: ReturnType<typeof functions.calcule_combustion>["rpint"];
	rpn: ReturnType<typeof functions.calcule_combustion>["rpn"];
	qp0: ReturnType<typeof functions.calcule_combustion>["qp0"];
	pveilleuse: ReturnType<typeof functions.calcule_combustion>["pveilleuse"];
	qpx: ReturnType<typeof functions.calcule_qpx>;
	scop: ReturnType<typeof functions.calcule_scop>;
	tfonc30: ReturnType<typeof functions.calcule_tfonc30>;
	tfonc100: ReturnType<typeof functions.calcule_tfonc100>;
	qgen_rec: ReturnType<typeof functions.calcule_qgen_rec>;
	qgen: ReturnType<typeof functions.calcule_qgen>;
};
