import data from "../../../data/enveloppe/plancher-bas/upb.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type UpbSchema = {
	zone_climatique: string;
	"annee_construction_isolation/gte": number | null;
	"annee_construction_isolation/lte": number | null;
	effet_joule: boolean;
	u: number;
	tv_upb_id: number;
};

export const load = (): UpbSchema[] => data as UpbSchema[];
export const search = (query: AbaqueQuery, rows: UpbSchema[]): UpbSchema[] =>
	filter(query, rows);
