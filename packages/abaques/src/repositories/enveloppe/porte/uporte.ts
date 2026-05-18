import data from "../../../data/enveloppe/porte/uporte.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type UporteSchema = {
	presence_sas: boolean | null;
	materiau: string | null;
	isolation: boolean | null;
	type_vitrage: string | null;
	"taux_vitrage/gt": number | null;
	"taux_vitrage/lt": number | null;
	"taux_vitrage/gte": number | null;
	"taux_vitrage/eq": number | null;
	u: number;
	tv_uporte_id: number;
};

export const load = (): UporteSchema[] => data as UporteSchema[];
export const search = (
	query: AbaqueQuery,
	rows: UporteSchema[],
): UporteSchema[] => filter(query, rows);
