import data from "#data/enveloppe/masque/omb.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type OmbSchema = {
	orientation_facade: string;
	secteur_orientation: string;
	"hauteur_alpha_masque/gte": number | null;
	"hauteur_alpha_masque/lt": number | null;
	hauteur_alpha_defaut: number | null;
	omb: number;
};

export const load = (): OmbSchema[] => data as OmbSchema[];

export const search = (query: AbaqueQuery, rows: OmbSchema[]): OmbSchema[] =>
	filter(query, rows);
