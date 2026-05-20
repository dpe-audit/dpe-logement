import data from "#data/chauffage/pn.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type PnSchema = {
	position_chaudiere: string;
	"pdim/gt": number | null;
	"pdim/lte": number | null;
	"annee_installation_generateur/gt": number | null;
	"annee_installation_generateur/lte": number | null;
	pn: number;
	type_chaudiere_defaut: string | null;
};

export const load = (): PnSchema[] => data as PnSchema[];

export const search = (query: AbaqueQuery, rows: PnSchema[]): PnSchema[] =>
	filter(query, rows);
