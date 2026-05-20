import data from "#data/enveloppe/baie/sw.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type SwSchema = {
	type_baie: string;
	presence_soubassement: boolean | null;
	materiau: string | null;
	type_vitrage: string | null;
	type_pose: string | null;
	type_survitrage: string | null;
	sw: number;
};

export const load = (): SwSchema[] => data as SwSchema[];

export const search = (query: AbaqueQuery, rows: SwSchema[]): SwSchema[] =>
	filter(query, rows);
