import data, { type Row } from '../../../data/enveloppe/local-non-chauffe/t.js'
import { Repository } from '../../../repository.js'

export type LocalNonChauffeTSchema = Row

export class LocalNonChauffeTRepository extends Repository<LocalNonChauffeTSchema> {
  protected load(): LocalNonChauffeTSchema[] {
    return data
  }
}
