import data, { type Row } from '../../../data/enveloppe/local-non-chauffe/b.js'
import { Repository } from '../../../repository.js'

export type LocalNonChauffeBSchema = Row

export class LocalNonChauffeBRepository extends Repository<LocalNonChauffeBSchema> {
  protected load(): LocalNonChauffeBSchema[] {
    return data
  }
}
