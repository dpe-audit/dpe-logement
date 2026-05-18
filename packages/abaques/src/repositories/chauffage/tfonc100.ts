import data from "../../data/chauffage/tfonc100.js";
import { type AbaqueQuery, filter } from "../../filter.js";

export type Tfonc100Schema = {
	temperature_distribution: string;
	"annee_installation_emetteur/gte": number | null;
	"annee_installation_emetteur/lte": number | null;
	tfonc100: number;
	tv_temp_fonc_100_id: number;
};

export const load = (): Tfonc100Schema[] => data as Tfonc100Schema[];

export const search = (
	query: AbaqueQuery,
	rows: Tfonc100Schema[],
): Tfonc100Schema[] => filter(query, rows);
