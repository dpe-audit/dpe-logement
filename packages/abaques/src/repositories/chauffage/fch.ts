import data, { type Row } from '../../data/chauffage/fch.js'
import { Repository } from '../../repository.js'

export type ChauffageFchSchema = Row

export class ChauffageFchRepository extends Repository<ChauffageFchSchema> {
  protected load(): ChauffageFchSchema[] {
    return data
  }
}
