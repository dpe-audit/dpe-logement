import data, { type Row } from '../../../data/enveloppe/baie/deltar.js'
import { Repository } from '../../../repository.js'

export type BaieDelatarSchema = Row

export class BaieDelatarRepository extends Repository<BaieDelatarSchema> {
  protected load(): BaieDelatarSchema[] {
    return data
  }
}
