import data, { type Row } from '../../../data/enveloppe/baie/sw.js'
import { Repository } from '../../../repository.js'

export type BaieSwSchema = Row

export class BaieSwRepository extends Repository<BaieSwSchema> {
  protected load(): BaieSwSchema[] {
    return data
  }
}
