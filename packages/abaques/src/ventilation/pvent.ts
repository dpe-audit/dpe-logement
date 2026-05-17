import type { RangeBounds } from "../filter";

export type PventSchema = {
	type_installation: string[];
	annee_installation: RangeBounds;
	pvent: number;
};

export type PventQuery = {
	type_installation?: string;
	annee_installation?: number;
};
