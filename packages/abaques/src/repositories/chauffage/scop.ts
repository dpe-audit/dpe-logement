import data from "../../data/chauffage/scop.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type ScopSchema = {
	zone_climatique: string;
	type_generateur: string;
	type_emetteur: string | null;
	"annee_installation_generateur/lte": number | null;
	"annee_installation_generateur/gte": number | null;
	scop_cop: string;
	scop: number;
	tv_scop_id: number;
};

export const load = (): ScopSchema[] => data as ScopSchema[];

export const search = (query: AbaqueQuery, rows: ScopSchema[]): ScopSchema[] =>
	filter(query, rows);
