import data from "../../data/ecs/rg.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type EcsRgSchema = {
	type_generateur: string;
	energie_generateur: string | null;
	rg: number;
};

export const load = (): EcsRgSchema[] => data as EcsRgSchema[];

export const search = (
	query: AbaqueQuery,
	rows: EcsRgSchema[],
): EcsRgSchema[] => filter(query, rows);
