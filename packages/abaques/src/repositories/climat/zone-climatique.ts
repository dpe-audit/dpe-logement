import data from "../../data/climat/zone-climatique.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type ZoneClimatiqueSchema = {
	code_departement: string;
	departement: string;
	zone_climatique: string;
};

export const load = (): ZoneClimatiqueSchema[] =>
	data as ZoneClimatiqueSchema[];

export const search = (
	query: AbaqueQuery,
	rows: ZoneClimatiqueSchema[],
): ZoneClimatiqueSchema[] => filter(query, rows);
