import data, { type Row } from '../../data/chauffage/scop.js'
import { Repository } from '../../repository.js'

export type ChauffageScopSchema = Row

export class ChauffageScopRepository extends Repository<ChauffageScopSchema> {
  protected load(): ChauffageScopSchema[] {
    return data
  }
}
