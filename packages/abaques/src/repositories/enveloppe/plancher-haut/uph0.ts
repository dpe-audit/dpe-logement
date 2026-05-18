import data from "../../../data/enveloppe/plancher-haut/uph0.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type Uph0Schema = {
	type_plancher_haut: string;
	u0: number;
	tv_uph0_id: number;
};

export const load = (): Uph0Schema[] => data as Uph0Schema[];
export const search = (query: AbaqueQuery, rows: Uph0Schema[]): Uph0Schema[] =>
	filter(query, rows);
