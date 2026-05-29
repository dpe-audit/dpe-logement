import * as functions from "./functions.js";

export type ClimatResults = {
	zone_climatique: ReturnType<typeof functions.calcule_zone_climatique>;
	tbase: ReturnType<typeof functions.calcule_tbase>;
	sollicitations: ReturnType<typeof functions.calcule_sollicitations>;
	c1: ReturnType<typeof functions.calcule_c1>;
	nj: ReturnType<typeof functions.calcule_nj>;
	parois_anciennes: ReturnType<typeof functions.calcule_parois_anciennes>;
};
