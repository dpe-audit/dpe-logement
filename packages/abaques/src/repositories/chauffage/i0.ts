import data, { type Row } from '../../data/chauffage/i0.js'
import { Repository } from '../../repository.js'

export type ChauffageI0Schema = Row

export class ChauffageI0Repository extends Repository<ChauffageI0Schema> {
  protected load(): ChauffageI0Schema[] {
    return data
  }
}
