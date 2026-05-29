import * as functions from "./functions.js";

export type GenerateurResults = {
	cecs: ReturnType<typeof functions.calcule_cecs>;
	caux: ReturnType<typeof functions.calcule_caux>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	pn: ReturnType<typeof functions.calcule_pn>;
	pdim: ReturnType<typeof functions.calcule_pdim>;
	pecs: ReturnType<typeof functions.calcule_pecs>;
	paux: ReturnType<typeof functions.calcule_paux>;
	cop: ReturnType<typeof functions.calcule_cop>;
	rpn: ReturnType<typeof functions.calcule_combustion>["rpn"];
	qp0: ReturnType<typeof functions.calcule_combustion>["qp0"];
	pveilleuse: ReturnType<typeof functions.calcule_combustion>["pveilleuse"];
	cr: ReturnType<typeof functions.calcule_cr>;
	qgw: ReturnType<typeof functions.calcule_qgw>;
	qgen: ReturnType<typeof functions.calcule_qgen>;
};
