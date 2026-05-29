import data from "#data/chauffage/i0.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type I0Schema = {
	type_batiment: string;
	type_chauffage: string;
	type_emission: string;
	inertie: string | null;
	installation_collective: boolean | null;
	comptage_individuel: boolean | null;
	regulation_terminale: boolean | null;
	type_programmation: string;
	i0: number;
};

export const load = (): I0Schema[] => data as I0Schema[];

export const search = (query: AbaqueQuery, rows: I0Schema[]): I0Schema[] =>
	filter(query, rows);
