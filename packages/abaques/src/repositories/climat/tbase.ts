import data from "#data/climat/tbase.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type TbaseSchema = {
	zone_climatique: string;
	"altitude/gt": number | null;
	"altitude/gte": number | null;
	"altitude/lt": number | null;
	"altitude/lte": number | null;
	tbase: number;
};

export const load = (): TbaseSchema[] => data as TbaseSchema[];

export const search = (
	query: AbaqueQuery,
	rows: TbaseSchema[],
): TbaseSchema[] => filter(query, rows);
