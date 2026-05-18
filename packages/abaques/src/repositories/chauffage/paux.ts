import data from "../../data/chauffage/paux.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type PauxSchema = {
	type_generateur: string;
	energie_generateur: string | null;
	generateur_multi_batiment: boolean | null;
	presence_ventouse: boolean | null;
	G: number | null;
	H: number | null;
	pn_max: number | null;
	paux: string;
};

export const load = (): PauxSchema[] => data as PauxSchema[];

export const search = (query: AbaqueQuery, rows: PauxSchema[]): PauxSchema[] =>
	filter(query, rows);
