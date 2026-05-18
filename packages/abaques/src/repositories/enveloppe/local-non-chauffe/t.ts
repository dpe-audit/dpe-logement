import data from "../../../data/enveloppe/local-non-chauffe/t.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type TSchema = {
	type_vitrage: string;
	materiau: string | null;
	presence_rupteur_pont_thermique: boolean | null;
	t: number;
	tv_coef_transparence_ets_id: number;
};

export const load = (): TSchema[] => data as TSchema[];
export const search = (query: AbaqueQuery, rows: TSchema[]): TSchema[] =>
	filter(query, rows);
