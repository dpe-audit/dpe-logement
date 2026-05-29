import data from "#data/production/taplp.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type KpvSchema = {
	usage_electricite: string;
	taplp: number;
};

export const load = (): KpvSchema[] => data as KpvSchema[];

export const search = (query: AbaqueQuery, rows: KpvSchema[]): KpvSchema[] =>
	filter(query, rows);
