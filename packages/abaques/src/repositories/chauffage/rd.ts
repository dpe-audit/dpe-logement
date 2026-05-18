import data from "../../data/chauffage/rd.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type RdSchema = {
	type_distribution: string;
	temperature_distribution: string | null;
	presence_fluide_frigorigene: boolean | null;
	reseau_collectif: boolean | null;
	isolation_reseau: boolean | null;
	rd: number;
};

export const load = (): RdSchema[] => data as RdSchema[];

export const search = (query: AbaqueQuery, rows: RdSchema[]): RdSchema[] =>
	filter(query, rows);
