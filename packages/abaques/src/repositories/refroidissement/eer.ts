import data, { type Row } from '../../data/refroidissement/eer.js'
import { Repository } from '../../repository.js'

export type RefroidissementEerSchema = Row

export class RefroidissementEerRepository extends Repository<RefroidissementEerSchema> {
  protected load(): RefroidissementEerSchema[] {
    return data
  }
}
