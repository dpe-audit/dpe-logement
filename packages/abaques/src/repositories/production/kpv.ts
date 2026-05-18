import data from "../../data/production/kpv.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type KpvSchema = {
	orientation_pv: string;
	"inclinaison_pv/gt": number | null;
	"inclinaison_pv/lte": number | null;
	kpv: number;
};

export const load = (): KpvSchema[] => data as KpvSchema[];
export const search = (query: AbaqueQuery, rows: KpvSchema[]): KpvSchema[] =>
	filter(query, rows);
