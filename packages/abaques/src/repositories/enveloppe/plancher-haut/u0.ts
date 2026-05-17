import data, { type Row } from '../../../data/enveloppe/plancher-haut/u0.js'
import { Repository } from '../../../repository.js'

export type PlancherHautU0Schema = Row

export class PlancherHautU0Repository extends Repository<PlancherHautU0Schema> {
  protected load(): PlancherHautU0Schema[] {
    return data
  }
}
