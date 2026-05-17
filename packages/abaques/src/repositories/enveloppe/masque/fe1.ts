import data, { type Row } from '../../../data/enveloppe/masque/fe1.js'
import { Repository } from '../../../repository.js'

export type MasqueFe1Schema = Row

export class MasqueFe1Repository extends Repository<MasqueFe1Schema> {
  protected load(): MasqueFe1Schema[] {
    return data
  }
}
