import data, { type Row } from '../../data/chauffage/tfonc100.js'
import { Repository } from '../../repository.js'

export type ChauffageTfonc100Schema = Row

export class ChauffageTfonc100Repository extends Repository<ChauffageTfonc100Schema> {
  protected load(): ChauffageTfonc100Schema[] {
    return data
  }
}
