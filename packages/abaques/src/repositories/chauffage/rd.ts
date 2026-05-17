import data, { type Row } from '../../data/chauffage/rd.js'
import { Repository } from '../../repository.js'

export type ChauffageRdSchema = Row

export class ChauffageRdRepository extends Repository<ChauffageRdSchema> {
  protected load(): ChauffageRdSchema[] {
    return data
  }
}
