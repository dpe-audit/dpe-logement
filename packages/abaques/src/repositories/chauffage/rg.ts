import data from "#data/chauffage/rg.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type RgSchema = {
	type_generateur: string;
	energie_generateur: string | null;
	label_generateur: string | null;
	"annee_installation_generateur/gte": number | null;
	"annee_installation_generateur/lte": number | null;
	rg: number;
};

export const load = (): RgSchema[] => data as RgSchema[];

export const search = (query: AbaqueQuery, rows: RgSchema[]): RgSchema[] =>
	filter(query, rows);
