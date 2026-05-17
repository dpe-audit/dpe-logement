import data, { type Row } from '../../../data/enveloppe/porte/u.js'
import { Repository } from '../../../repository.js'

export type PorteUSchema = Row

export class PorteURepository extends Repository<PorteUSchema> {
  protected load(): PorteUSchema[] {
    return data
  }
}
