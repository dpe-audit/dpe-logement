import { NheclRepository } from './eclairage/nhecl.js'

export interface Abaques {
  nhecl: NheclRepository
}

export function createAbaques(): Abaques {
  return {
    nhecl: new NheclRepository(),
  }
}
