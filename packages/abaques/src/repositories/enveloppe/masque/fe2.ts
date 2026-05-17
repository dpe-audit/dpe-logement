import data, { type Row } from '../../../data/enveloppe/masque/fe2.js'
import { Repository } from '../../../repository.js'

export type MasqueFe2Schema = Row

export class MasqueFe2Repository extends Repository<MasqueFe2Schema> {
  protected load(): MasqueFe2Schema[] {
    return data
  }
}
