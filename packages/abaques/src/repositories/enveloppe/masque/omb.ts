import data, { type Row } from '../../../data/enveloppe/masque/omb.js'
import { Repository } from '../../../repository.js'

export type MasqueOmbSchema = Row

export class MasqueOmbRepository extends Repository<MasqueOmbSchema> {
  protected load(): MasqueOmbSchema[] {
    return data
  }
}
