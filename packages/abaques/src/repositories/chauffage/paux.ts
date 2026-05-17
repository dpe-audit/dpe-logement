import data, { type Row } from '../../data/chauffage/paux.js'
import { Repository } from '../../repository.js'

export type ChauffagePauxSchema = Row

export class ChauffagePauxRepository extends Repository<ChauffagePauxSchema> {
  protected load(): ChauffagePauxSchema[] {
    return data
  }
}
