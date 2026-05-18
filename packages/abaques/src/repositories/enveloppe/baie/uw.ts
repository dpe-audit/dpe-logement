import data from "../../../data/enveloppe/baie/uw.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type UwSchema = {
	type_baie: string;
	soubassement: boolean | null;
	materiau: string | null;
	rupteur_pont_thermique: boolean | null;
	ug: number | null;
	uw: number;
	tv_uw_id: number;
};

export const load = (): UwSchema[] => data as UwSchema[];
export const search = (query: AbaqueQuery, rows: UwSchema[]): UwSchema[] =>
	filter(query, rows);
