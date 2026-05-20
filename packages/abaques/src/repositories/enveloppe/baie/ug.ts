import data from "#data/enveloppe/baie/ug.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type UgSchema = {
	type_vitrage: string;
	type_survitrage: string | null;
	type_baie: string | null;
	nature_lame_air: string | null;
	"epaisseur_lame_air/eq": number | null;
	"epaisseur_lame_air/gte": number | null;
	"epaisseur_lame_air/lt": number | null;
	"inclinaison_vitrage/lt": number | null;
	"inclinaison_vitrage/gte": number | null;
	ug: number;
	tv_ug_id: number;
};

export const load = (): UgSchema[] => data as UgSchema[];
export const search = (query: AbaqueQuery, rows: UgSchema[]): UgSchema[] =>
	filter(query, rows);
