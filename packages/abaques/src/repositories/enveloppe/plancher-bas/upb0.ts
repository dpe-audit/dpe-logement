import data from "../../../data/enveloppe/plancher-bas/upb0.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type Upb0Schema = {
	type_structure: string;
	u0: number;
	tv_upb0_id: number;
};

export const load = (): Upb0Schema[] => data as Upb0Schema[];
export const search = (query: AbaqueQuery, rows: Upb0Schema[]): Upb0Schema[] =>
	filter(query, rows);
