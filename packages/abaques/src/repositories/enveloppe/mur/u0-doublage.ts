import data, { type Row } from '../../../data/enveloppe/mur/u0-doublage.js'
import { Repository } from '../../../repository.js'

export type MurU0DoublageSchema = Row

export class MurU0DoublageRepository extends Repository<MurU0DoublageSchema> {
  protected load(): MurU0DoublageSchema[] {
    return data
  }
}
