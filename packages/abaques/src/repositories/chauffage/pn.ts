import data, { type Row } from '../../data/chauffage/pn.js'
import { Repository } from '../../repository.js'

export type ChauffagePnSchema = Row

export class ChauffagePnRepository extends Repository<ChauffagePnSchema> {
  protected load(): ChauffagePnSchema[] {
    return data
  }
}
