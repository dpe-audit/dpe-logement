import data from "../../../data/enveloppe/plancher-bas/ue.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type UeSchema = {
	mitoyennete: string;
	"annee_construction/gte": number | null;
	"annee_construction/lte": number | null;
	"2s/p": number | null;
	u: number | null;
	ue: number;
	tv_ue_id: number;
};

export const load = (): UeSchema[] => data as UeSchema[];
export const search = (query: AbaqueQuery, rows: UeSchema[]): UeSchema[] =>
	filter(query, rows);
