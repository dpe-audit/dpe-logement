# Design — Refactoring du package abaques

Date : 2026-05-18

## Contexte et problèmes

- `/doctrine/abaques` est la source de vérité des abaques (CSV + `.schema.yaml`)
- `/scripts/generate-abaques.mjs` génère actuellement types ET données dans `/packages/abaques/src/data/`
- Les types inférés par le script peuvent dériver silencieusement de la doctrine
- Les repositories re-aliasent mécaniquement `Row` sans valeur ajoutée
- `scripts/abaques-schema.json` duplique une partie de l'information des `.schema.yaml`

## Objectif

Séparer clairement les responsabilités :

| Couche | Responsabilité |
|---|---|
| `doctrine/abaques/X/Y.schema.yaml` | Source canonique : colonnes, types, contraintes |
| `scripts/generate-abaques.mjs` | Génère uniquement les données + valide contre le schema |
| `packages/abaques/src/data/X/Y.ts` | Expose les données générées (pas de types) |
| `packages/abaques/src/repositories/X/Y.ts` | Définit les types manuellement, fournit l'API |
| `packages/abaques/src/filter.ts` | Gère le filtrage, y compris les enums concaténés par `|` |

## Architecture

### 1. Suppression de `scripts/abaques-schema.json`

Le fichier est supprimé. Sa responsabilité passe aux `.schema.yaml` côté doctrine et aux types manuels côté repositories.

### 2. Mapping schema YAML → TypeScript

Le générateur lit le `.schema.yaml` de chaque abaque pour valider les données (warnings en console). Il n'émet plus de types dans les fichiers générés.

La correspondance de types est la suivante :

| YAML `type` | YAML `format` | `required: true` | `required: false` |
|---|---|---|---|
| `string` | `enums` | `string` | `string \| null` |
| `string` | *(absent)* | `string` | `string \| null` |
| `boolean` | — | `boolean` | `boolean \| null` |
| `number` | — | `number` | `number \| null` |
| `integer` | — | `number` | `number \| null` |
| `name/gte`, `name/lte`, `name/gt`, `name/lt`, `name/eq` | — | `number \| null` | `number \| null` |

Les colonnes non déclarées dans le `.schema.yaml` (ex. `tv_*_id`) : le script infère le type depuis les données CSV et émet un warning en console.

### 3. Format des fichiers générés (`data/`)

Les valeurs CSV pipe-séparées (`"H1a|H1b|H1c"`) sont conservées comme `string` brut — le script ne découpe plus en `string[]`.

**Fichier simple (≤ 200 lignes) :**

```ts
// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/chauffage/fch.csv

export default [
  { "zone_climatique": "H1a", "type_batiment": "maison", "fch": 0.25, "tv_facteur_couverture_solaire_id": 1 },
  ...
]
```

**Fichier large (> 200 lignes), découpage en chunks :**

```ts
// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/chauffage/scop.csv

const chunk0 = [...]
const chunk1 = [...]
export default [...chunk0, ...chunk1]
```

**Règles :** aucun `import`, aucun `type`, aucun `export type` dans les fichiers générés.

### 4. Format des repositories

Les repositories définissent les types manuellement en s'appuyant sur le `.schema.yaml` comme référence de lecture.

```ts
// packages/abaques/src/repositories/chauffage/fch.ts
import data from '../../data/chauffage/fch.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FchSchema = {
  zone_climatique: string
  type_batiment: string
  fch: number
  tv_facteur_couverture_solaire_id: number
}

export const load = (): FchSchema[] => data as FchSchema[]
export const search = (query: AbaqueQuery, rows: FchSchema[]) => filter(query, rows)
```

Le cast `data as FchSchema[]` est intentionnel : la cohérence entre données et types repose sur le `.schema.yaml` et les warnings du script.

### 5. Mise à jour de `filter.ts`

**Enums concaténés :** quand une cellule est de type `string` et contient `|`, le filtre splitte sur `|` et vérifie si le queryValue est dans la liste résultante.

```
cellule "H1a|H1b|H1c" + queryValue "H1b"  → match
cellule "H1a|H1b|H1c" + queryValue "H3"   → no match
cellule "H1a"          + queryValue "H1a"  → match (string simple, pas de split)
```

**Champs range :** les bornes sont stockées comme clés plates dans les data files, conformément au nommage du schema YAML (`"annee_installation/gte"`, `"annee_installation/lte"`). Le type `RangeBounds` est supprimé. `filter.ts` détecte les clés range via le suffixe (`/gte`, `/lte`, `/gt`, `/lt`, `/eq`) et applique la comparaison numérique correspondante.

```
queryValue "annee_installation" = 2010
+ cellule "annee_installation/gte" = 2008
+ cellule "annee_installation/lte" = 2014
→ match (2008 ≤ 2010 ≤ 2014)
```

Le comportement pour les cellules `boolean` et `number` scalaires ne change pas.

## Périmètre

### Dans le scope

- Mise à jour de `scripts/generate-abaques.mjs` (lecture schema YAML, suppression inférence de types, conservation brute des strings)
- Suppression de `scripts/abaques-schema.json`
- Régénération de tous les fichiers `packages/abaques/src/data/**/*.ts`
- Mise à jour de `packages/abaques/src/filter.ts` (gestion enums string concaténés)
- Mise à jour de tous les repositories `packages/abaques/src/repositories/**/*.ts` (types manuels)

### Hors scope

- Modification des `.schema.yaml` (ils sont la source de vérité, pas modifiés par ce refactoring)
- Modification de l'API publique (`abaques.chauffage.fch.load()`, `.search()`)
- Ajout de colonnes `tv_*_id` dans les `.schema.yaml`

## Critères de succès

- `tsc --noEmit` passe sans erreur
- Les tests existants (`filter.test.ts`) passent
- Aucun fichier `data/` ne contient de `type` ou `export type`
- Chaque repository déclare un type explicite (pas de `= Row`)
- Le script émet des warnings pour les colonnes `tv_*_id` non déclarées dans les schemas
