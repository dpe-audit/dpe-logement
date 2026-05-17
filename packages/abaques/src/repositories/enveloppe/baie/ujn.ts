import data, { type Row } from '../../../data/enveloppe/baie/ujn.js'
import { Repository } from '../../../repository.js'

export type BaieUjnSchema = Row

export class BaieUjnRepository extends Repository<BaieUjnSchema> {
  protected load(): BaieUjnSchema[] {
    return data
  }
}
