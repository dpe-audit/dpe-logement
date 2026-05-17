import data, { type Row } from '../../data/chauffage/rr.js'
import { Repository } from '../../repository.js'

export type ChauffageRrSchema = Row

export class ChauffageRrRepository extends Repository<ChauffageRrSchema> {
  protected load(): ChauffageRrSchema[] {
    return data
  }
}
