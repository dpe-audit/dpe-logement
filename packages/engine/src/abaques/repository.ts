import { type AbaqueQuery, find, search } from './filter.js'

export abstract class Repository<S extends object, Q extends AbaqueQuery = AbaqueQuery> {
  private cache: S[] | null = null

  protected abstract load(): S[]

  all(): S[] {
    if (this.cache === null) this.cache = this.load()
    return this.cache
  }

  search(query: Q): S[] {
    return search(this.all(), query)
  }

  find(query: Q): S | null {
    return find(this.all(), query)
  }
}
