import data from "#data/chauffage/emission.js";
import { type AbaqueQuery, filter } from "#filter.js";

export type EmissionSchema = {
	type_generateur: string;
	type_emetteur: string | null;
	type_emission: string;
};

export const load = (): EmissionSchema[] => data as EmissionSchema[];

export const search = (
	query: AbaqueQuery,
	rows: EmissionSchema[],
): EmissionSchema[] => filter(query, rows);
