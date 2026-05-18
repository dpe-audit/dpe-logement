import data from "../../../data/enveloppe/local-non-chauffe/b.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type LncBSchema = {
	uvue: number;
	isolation_aiu: boolean;
	isolation_aue: boolean;
	"aiu_aue/gt": number;
	"aiu_aue/lte": number;
	b: number;
	tv_coef_reduction_deperdition_id: number;
};

export const load = (): LncBSchema[] => data as LncBSchema[];
export const search = (query: AbaqueQuery, rows: LncBSchema[]): LncBSchema[] =>
	filter(query, rows);
