import data, { type Row } from '../../../data/enveloppe/paroi/bver.js'
import { Repository } from '../../../repository.js'

export type ParoiBverSchema = Row

export class ParoiBverRepository extends Repository<ParoiBverSchema> {
  protected load(): ParoiBverSchema[] {
    return data
  }
}
