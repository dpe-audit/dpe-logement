import data, { type Row } from '../../../data/enveloppe/plancher-haut/u.js'
import { Repository } from '../../../repository.js'

export type PlancherHautUSchema = Row

export class PlancherHautURepository extends Repository<PlancherHautUSchema> {
  protected load(): PlancherHautUSchema[] {
    return data
  }
}
