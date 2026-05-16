# Abaques

@next :

1. Générer automatiquement tous les repositories
2. Exporter les instances des repositories de chaque répertoire
3. Exporter globalement

```typescript
// Interface publique — découple les règles des repositories
export interface Abaque<S extends object> {
  all(): S[]
}

// Classe abstraite — cache lazy uniquement, pas de Singleton
// Limitation : load() est synchrone (lecture CSV bundlé).
// Si un repository futur charge depuis une API, l'interface devra devenir async.
export abstract class Repository<S extends object> implements Abaque<S> {
  private cache: S[] | null = null

  protected abstract load(): S[]

  all(): S[] {
    if (!this.cache) this.cache = this.load()
    return this.cache
  }
}

// Repository concret — uniquement load()
export class AbaquePontThermique extends Repository<PontThermiqueRow> {
  protected load(): PontThermiqueRow[] {
    // Lecture synchrone du CSV bundlé depuis /engine/abaques/
  }
}

// Conteneur — instanciation centralisée des 40 repositories
export interface Abaques {
  pontThermique:  AbaquePontThermique
  facteurSolaire: AbaqueFacteurSolaire
  // ...
}

export function createAbaques(): Abaques {
  return {
    pontThermique:  new AbaquePontThermique(),
    facteurSolaire: new AbaqueFacteurSolaire(),
    // ...
  }
}
```