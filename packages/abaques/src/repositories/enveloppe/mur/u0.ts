import data, { type Row } from '../../../data/enveloppe/mur/u0.js'
import { Repository } from '../../../repository.js'

export type MurU0Schema = Row

export class MurU0Repository extends Repository<MurU0Schema> {
  protected load(): MurU0Schema[] {
    return data
  }
}
