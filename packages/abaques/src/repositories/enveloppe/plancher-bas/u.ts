import data, { type Row } from '../../../data/enveloppe/plancher-bas/u.js'
import { Repository } from '../../../repository.js'

export type PlancherBasUSchema = Row

export class PlancherBasURepository extends Repository<PlancherBasUSchema> {
  protected load(): PlancherBasUSchema[] {
    return data
  }
}
