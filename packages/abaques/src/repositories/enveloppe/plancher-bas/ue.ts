import data, { type Row } from '../../../data/enveloppe/plancher-bas/ue.js'
import { Repository } from '../../../repository.js'

export type PlancherBasUeSchema = Row

export class PlancherBasUeRepository extends Repository<PlancherBasUeSchema> {
  protected load(): PlancherBasUeSchema[] {
    return data
  }
}
