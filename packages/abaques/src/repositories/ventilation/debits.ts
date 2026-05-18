import data from "../../data/ventilation/debits.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type DebitsSchema = {
	type_ventilation: string;
	presence_echangeur_thermique: boolean | null;
	installation_collective: boolean | null;
	"annee_installation/gte": number | null;
	"annee_installation/lte": number | null;
	qvarep_conv: number;
	qvasouf_conv: number;
	smea_conv: number;
};

export const load = (): DebitsSchema[] => data as DebitsSchema[];
export const search = (
	query: AbaqueQuery,
	rows: DebitsSchema[],
): DebitsSchema[] => filter(query, rows);
