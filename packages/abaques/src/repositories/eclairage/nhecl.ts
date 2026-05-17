import data, { type Row } from '../../data/eclairage/nhecl.js'
import { Repository } from '../../repository.js'

export type EclairageNheclSchema = Row

export class EclairageNheclRepository extends Repository<EclairageNheclSchema> {
  protected load(): EclairageNheclSchema[] {
    return data
  }
}
