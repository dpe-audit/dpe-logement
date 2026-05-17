import data, { type Row } from '../../../data/enveloppe/baie/ug.js'
import { Repository } from '../../../repository.js'

export type BaieUgSchema = Row

export class BaieUgRepository extends Repository<BaieUgSchema> {
  protected load(): BaieUgSchema[] {
    return data
  }
}
