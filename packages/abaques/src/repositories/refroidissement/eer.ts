import data from "../../data/refroidissement/eer.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type EerSchema = {
	zone_climatique: string;
	"annee_installation/gte": number | null;
	"annee_installation/lte": number | null;
	eer: number;
};

export const load = (): EerSchema[] => data as EerSchema[];
export const search = (query: AbaqueQuery, rows: EerSchema[]): EerSchema[] =>
	filter(query, rows);
