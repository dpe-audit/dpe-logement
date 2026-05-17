import data, { type Row } from "../data/eclairage/nhecl.js";
import { Repository } from "../repository.js";
import type { AbaqueQuery } from "../filter.js";

export type NheclSchema = Row;
export type NheclQuery = {
	zone_climatique: string;
};

type _NheclQueryCheck = NheclQuery extends AbaqueQuery ? true : never;

export class NheclRepository extends Repository<NheclSchema, NheclQuery> {
	protected load(): NheclSchema[] {
		return data;
	}
}
