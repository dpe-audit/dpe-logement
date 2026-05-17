import data, { type Row } from '../../../data/enveloppe/plancher-bas/u0.js'
import { Repository } from '../../../repository.js'

export type PlancherBasU0Schema = Row

export class PlancherBasU0Repository extends Repository<PlancherBasU0Schema> {
  protected load(): PlancherBasU0Schema[] {
    return data
  }
}
