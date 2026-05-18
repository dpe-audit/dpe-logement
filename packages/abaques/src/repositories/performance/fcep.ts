import data from "../../data/performance/fcep.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type FcepSchema = {
	energie: string;
	fcep: number;
};

export const load = (): FcepSchema[] => data as FcepSchema[];
export const search = (query: AbaqueQuery, rows: FcepSchema[]): FcepSchema[] =>
	filter(query, rows);
