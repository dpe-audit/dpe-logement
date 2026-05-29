import * as functions from "./functions.js";

export type VentilationResults = {
	caux: ReturnType<typeof functions.calcule_caux>;
	qvarep_conv: ReturnType<typeof functions.calcule_qvarep_conv>;
	qvasouf_conv: ReturnType<typeof functions.calcule_qvasouf_conv>;
	smea_conv: ReturnType<typeof functions.calcule_smea_conv>;
	hvent: ReturnType<typeof functions.calcule_hvent>;
};
