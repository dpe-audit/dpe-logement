import data from "#data/chauffage/rr.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type RrSchema = {
	type_emission: string;
	type_generateur: string | null;
	label_generateur: string | null;
	reseau_collectif: boolean | null;
	presence_robinet_thermostatique: boolean | null;
	presence_regulation_terminale: boolean | null;
	rr: number;
};

export const load = (): RrSchema[] => data as RrSchema[];

export const search = (query: AbaqueQuery, rows: RrSchema[]): RrSchema[] =>
	filter(query, rows);
