import * as functions from "./functions.js";

export type EmetteurResults = {
	delta_pem: ReturnType<typeof functions.calcule_delta_pem>;
	fcot: ReturnType<typeof functions.calcule_fcot>;
	dtheta_dim: ReturnType<typeof functions.calcule_dtheta_dim>;
};
