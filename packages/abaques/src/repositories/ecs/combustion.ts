import data from "../../data/ecs/combustion.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type EcsCombustionSchema = {
	type_generateur: string;
	energie_generateur: string;
	mode_combustion: string;
	"volume_stockage/gt": number | null;
	"volume_stockage/eq": number | null;
	"annee_installation_generateur/lte": number | null;
	"annee_installation_generateur/gte": number | null;
	"pn/lte": number | null;
	"pn/gt": number | null;
	pn_max: number | null;
	rpn: string;
	qp0: string;
	pveilleuse: number;
	tv_generateur_combustion_id: number;
};

export const load = (): EcsCombustionSchema[] => data as EcsCombustionSchema[];

export const search = (
	query: AbaqueQuery,
	rows: EcsCombustionSchema[],
): EcsCombustionSchema[] => filter(query, rows);
