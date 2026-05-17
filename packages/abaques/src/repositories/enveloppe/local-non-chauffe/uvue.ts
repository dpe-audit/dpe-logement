import data, { type Row } from '../../../data/enveloppe/local-non-chauffe/uvue.js'
import { Repository } from '../../../repository.js'

export type LocalNonChauffeUvueSchema = Row

export class LocalNonChauffeUvueRepository extends Repository<LocalNonChauffeUvueSchema> {
  protected load(): LocalNonChauffeUvueSchema[] {
    return data
  }
}
