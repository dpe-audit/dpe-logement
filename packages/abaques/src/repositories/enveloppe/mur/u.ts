import data, { type Row } from '../../../data/enveloppe/mur/u.js'
import { Repository } from '../../../repository.js'

export type MurUSchema = Row

export class MurURepository extends Repository<MurUSchema> {
  protected load(): MurUSchema[] {
    return data
  }
}
