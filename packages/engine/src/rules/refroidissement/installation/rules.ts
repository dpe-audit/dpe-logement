import * as functions from "./functions.js";

export type InstallationResults = {
	rdim: ReturnType<typeof functions.calcule_rdim>;
};