import type { RangeBounds } from "../filter";

export type PventMoySchema = {
	type_ventilation: string[];
	type_vmc: string[];
	annee_installation: RangeBounds;
	pvent_moy: number;
};

export type PventMoyQuery = {
	type_ventilation?: string;
	type_vmc?: string;
	annee_installation?: number;
};
