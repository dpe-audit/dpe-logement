import type { PanneauPhotovoltaique } from "./panneau-photovoltaique.js";

/**
 * @see https://schemas.open-dpe.fr/production
 */
export type Production = {
	panneaux_photovoltaiques: PanneauPhotovoltaique[];
};

export type ProductionWithData<T extends Production = Production> = T & {
	data: ProductionData;
};

export type ProductionData = {
	ppv: number;
};
