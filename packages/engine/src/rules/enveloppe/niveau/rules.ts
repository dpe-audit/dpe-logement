import * as functions from "./functions.js";

export type NiveauResults = {
	inertie: ReturnType<typeof functions.calcule_inertie>;
};
