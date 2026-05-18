import data from "../../data/ventilation/pvent_moy.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type PventMoySchema = {
	type_ventilation: string;
	"annee_installation/gt": number | null;
	"annee_installation/lte": number | null;
	pvent_moy: number;
};

export const load = (): PventMoySchema[] => data as PventMoySchema[];
export const search = (
	query: AbaqueQuery,
	rows: PventMoySchema[],
): PventMoySchema[] => filter(query, rows);
