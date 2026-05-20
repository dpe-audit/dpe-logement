import data from "#data/enveloppe/mur/umur0.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type Umur0Schema = {
	type_mur: string;
	"epaisseur_mur/lt": number | null;
	"epaisseur_mur/lte": number | null;
	"epaisseur_mur/gt": number | null;
	"epaisseur_mur/gte": number | null;
	"annee_construction/lte": number | null;
	"annee_construction/gte": number | null;
	u0: number;
};

export const load = (): Umur0Schema[] => data as Umur0Schema[];

export const search = (
	query: AbaqueQuery,
	rows: Umur0Schema[],
): Umur0Schema[] => filter(query, rows);
