import * as functions from "./functions.js";

export type BaieResults = {
	ujn: ReturnType<typeof functions.calcule_ujn>;
	deltar_complexe: ReturnType<typeof functions.calcule_deltar_complexe>;
	deltar: ReturnType<typeof functions.calcule_deltar>;
	uw_complexe: ReturnType<typeof functions.calcule_uw_complexe>;
	uw: ReturnType<typeof functions.calcule_uw>;
	ug: ReturnType<typeof functions.calcule_ug>;
	sse: ReturnType<typeof functions.calcule_sse>;
	sw: ReturnType<typeof functions.calcule_sw>;
	fe: ReturnType<typeof functions.calcule_fe>;
	fe1: ReturnType<typeof functions.calcule_fe1>;
	fe2: ReturnType<typeof functions.calcule_fe2>;
};
