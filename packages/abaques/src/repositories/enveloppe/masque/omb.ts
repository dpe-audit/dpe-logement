import data from "../../../data/enveloppe/masque/omb.js";
import { type AbaqueQuery, filter } from "../../../filter.js";

export type OmbSchema = {
	type_masque: string;
	orientation_facade: string;
	secteur_orientation: string;
	"hauteur_alpha_masque/gte": number | null;
	"hauteur_alpha_masque/lt": number | null;
	hauteur_alpha_defaut: number | null;
	omb: number;
	tv_coef_masque_lointain_non_homogene_id: number;
};

export const load = (): OmbSchema[] => data as OmbSchema[];
export const search = (query: AbaqueQuery, rows: OmbSchema[]): OmbSchema[] =>
	filter(query, rows);
