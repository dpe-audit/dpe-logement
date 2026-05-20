import data from "#data/chauffage/re.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type ReSchema = {
	type_emission: string;
	type_generateur: string | null;
	label_generateur: string | null;
	re: number;
};

export const load = (): ReSchema[] => data as ReSchema[];

export const search = (query: AbaqueQuery, rows: ReSchema[]): ReSchema[] =>
	filter(query, rows);
