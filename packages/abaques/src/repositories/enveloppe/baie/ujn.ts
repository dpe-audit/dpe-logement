import data from "#data/enveloppe/baie/ujn.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type UjnSchema = {
	deltar: number;
	uw: number;
	ujn: number;
	tv_ujn_id: number;
};

export const load = (): UjnSchema[] => data as UjnSchema[];
export const search = (query: AbaqueQuery, rows: UjnSchema[]): UjnSchema[] =>
	filter(query, rows);
