import data from "../../../data/enveloppe/plancher-haut/uph.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type UphSchema = {
	configuration: string;
	zone_climatique: string;
	effet_joule: boolean;
	"annee_construction_isolation/lte": number | null;
	"annee_construction_isolation/gte": number | null;
	u: number;
	tv_uph_id: number;
};

export const load = (): UphSchema[] => data as UphSchema[];
export const search = (query: AbaqueQuery, rows: UphSchema[]): UphSchema[] =>
	filter(query, rows);
