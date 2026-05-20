import data from "#data/enveloppe/local-non-chauffe/uvue.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type UvueSchema = {
	type_local_non_chauffe: string;
	uvue: number;
	tv_uvue_id: number;
};

export const load = (): UvueSchema[] => data as UvueSchema[];
export const search = (query: AbaqueQuery, rows: UvueSchema[]): UvueSchema[] =>
	filter(query, rows);
