import data, { type Row } from '../../../data/enveloppe/baie/uw.js'
import { Repository } from '../../../repository.js'

export type BaieUwSchema = Row

export class BaieUwRepository extends Repository<BaieUwSchema> {
  protected load(): BaieUwSchema[] {
    return data
  }
}
