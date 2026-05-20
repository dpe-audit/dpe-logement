import data from "#data/climat/nj.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type NjSchema = {
	mois: string;
	nj: number;
};

export const load = (): NjSchema[] => data as NjSchema[];
export const search = (query: AbaqueQuery, rows: NjSchema[]): NjSchema[] =>
	filter(query, rows);
