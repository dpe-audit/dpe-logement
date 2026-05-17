import data, { type Row } from '../../data/chauffage/re.js'
import { Repository } from '../../repository.js'

export type ChauffageReSchema = Row

export class ChauffageReRepository extends Repository<ChauffageReSchema> {
  protected load(): ChauffageReSchema[] {
    return data
  }
}
