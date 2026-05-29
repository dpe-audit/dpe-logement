import data from "#data/chauffage/scop.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type ScopSchema = {
	zone_climatique: string;
	type_generateur: string;
	type_emetteur: string | null;
	"annee_installation/lte": number | null;
	"annee_installation/gte": number | null;
	scop: number;
};

export const load = (): ScopSchema[] => data as ScopSchema[];

export const search = (query: AbaqueQuery, rows: ScopSchema[]): ScopSchema[] =>
	filter(query, rows);
