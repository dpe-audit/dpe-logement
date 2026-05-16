import { Repository } from "../repository.js";
import type { AbaqueQuery, RangeBounds } from "../filter.js";

export type SollicitationsSchema = {
	mois: string;
	zone_climatique: string[];
	altitude: RangeBounds;
	parois_anciennes_lourdes: boolean;
	epv: number;
	text: number | null;
	e: number;
	efr26: number;
	efr28: number;
	tefs: number | null;
	nref19: number | null;
	nref21: number | null;
	nref26: number;
	nref28: number;
	dh14: number;
	dh19: number | null;
	dh21: number | null;
	dh26: number;
	dh28: number;
	textmoy_clim26: number | null;
	textmoy_clim28: number | null;
};

export type SollicitationsQuery = {
	zone_climatique: string;
	altitude: number;
	parois_anciennes_lourdes: boolean;
};

export class SollicitationsRepository extends Repository<
	SollicitationsSchema,
	SollicitationsQuery
> {
	protected load(): SollicitationsSchema[] {
		return [];
	}
}
