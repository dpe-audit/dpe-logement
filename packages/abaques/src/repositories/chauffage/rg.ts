import data, { type Row } from '../../data/chauffage/rg.js'
import { Repository } from '../../repository.js'

export type ChauffageRgSchema = Row

export class ChauffageRgRepository extends Repository<ChauffageRgSchema> {
  protected load(): ChauffageRgSchema[] {
    return data
  }
}
