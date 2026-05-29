import * as functions from "./functions.js";

export type RulesResults = {
	cep: ReturnType<typeof functions.calcule_cep>;
	eges: ReturnType<typeof functions.calcule_eges>;
};
