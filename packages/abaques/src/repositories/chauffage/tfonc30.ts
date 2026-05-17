import data, { type Row } from '../../data/chauffage/tfonc30.js'
import { Repository } from '../../repository.js'

export type ChauffageTfonc30Schema = Row

export class ChauffageTfonc30Repository extends Repository<ChauffageTfonc30Schema> {
  protected load(): ChauffageTfonc30Schema[] {
    return data
  }
}
