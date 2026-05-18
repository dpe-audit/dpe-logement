import data from "../../data/chauffage/combustion.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type CombustionSchema = {
	type_generateur: string;
	energie_generateur: string;
	mode_combustion: string;
	"annee_installation_generateur/lte": number | null;
	"annee_installation_generateur/gte": number | null;
	"pn/lte": number | null;
	"pn/gt": number | null;
	pn_max: number | null;
	rpn: string;
	rpint: string;
	qp0: string;
	pveilleuse: number;
	tv_generateur_combustion_id: number;
};

export const load = (): CombustionSchema[] => data as CombustionSchema[];

export const search = (
	query: AbaqueQuery,
	rows: CombustionSchema[],
): CombustionSchema[] => filter(query, rows);
