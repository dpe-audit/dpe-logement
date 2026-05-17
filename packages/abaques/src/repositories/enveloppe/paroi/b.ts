import data, { type Row } from '../../../data/enveloppe/paroi/b.js'
import { Repository } from '../../../repository.js'

export type ParoiBSchema = Row

export class ParoiBRepository extends Repository<ParoiBSchema> {
  protected load(): ParoiBSchema[] {
    return data
  }
}
