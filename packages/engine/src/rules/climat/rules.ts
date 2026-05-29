import type { Context } from "#core/context.js";
import * as functions from "./functions.js";

export type ClimatResults = {
	zone_climatique: ReturnType<typeof functions.calcule_zone_climatique>;
	tbase: ReturnType<typeof functions.calcule_tbase>;
	sollicitations: ReturnType<typeof functions.calcule_sollicitations>;
	c1: ReturnType<typeof functions.filtre_c1>;
	nj: ReturnType<typeof functions.calcule_nj>;
	parois_anciennes: ReturnType<typeof functions.calcule_parois_anciennes>;
};

export const ID = "climat";

export const RULES = {
	zone_climatique: "zone_climatique",
	tbase: "tbase",
	sollicitations: "sollicitations",
	c1: "c1",
	nj: "nj",
	parois_anciennes: "parois_anciennes",
} as const;

function get_zone_climatique(ctx: Context): ClimatResults["zone_climatique"] {
	const code_insee = ctx.diagnostic.batiment.adresse.code_insee;
	return functions.calcule_zone_climatique({
		code_departement: code_insee.substring(0, 2),
	});
}

function get_tbase(ctx: Context): ClimatResults["tbase"] {
	return functions.calcule_tbase({
		zone_climatique: ctx.resolve(ID, RULES.zone_climatique),
	});
}
