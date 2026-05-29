import * as functions from "./functions.js";

export type EclairageResults = {
	cecl: ReturnType<typeof functions.calcule_cecl>;
	nhecl: ReturnType<typeof functions.calcule_nhecl>;
};
