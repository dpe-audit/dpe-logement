import * as functions from "./functions.js";

export type VentilationInstallationResults = {
	caux: ReturnType<typeof functions.calcule_caux>;
	pvent_moy: ReturnType<typeof functions.calcule_pvent_moy>;
	rut: ReturnType<typeof functions.calcule_rut>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	qvarep_conv: ReturnType<typeof functions.calcule_debits>["qvarep_conv"];
	qvasouf_conv: ReturnType<typeof functions.calcule_debits>["qvasouf_conv"];
	smea_conv: ReturnType<typeof functions.calcule_debits>["smea_conv"];
	hvent: ReturnType<typeof functions.calcule_hvent>;
};
