---
paths: [/schemas]
---

# Schémas de données publiques

Standard de données publiques du Diagnostic de Performance Energétique.

## Usages

```text
npm run schemas:validate        # Valide les exemples de données
npm run schemas:build           # Déréférence le schéma de données aux formats JSON et YAML
```

## Organisation

```text
schemas/
├── common/                     # Définitions globales
├── batiment/
├── chauffage/
├── ecs/
├── production/
├── refroidissement/
├── ventilation/
├── manifest.schema.yaml        # Schéma des manifestes de versions
├── schemas.yaml                # Point d'entrée
└── CHANGELOG.md
```

## Versionnage

Les schémas publics sont **contractuels et stables**.

## Spécifications

- JSON Schéma 2020-12
- Schémas sources en YAML
- Compilation en YAML et JSON
- UTF-8

## Keywords

Mots-clés JSON Schema personnalisés.

### `x-enum`

**Type :** `string`
**Format :** `^([a-z-]+:)*([a-z-]+)$`
**Exemple :** `x-enum: batiment:type`

Identifie une valeur énumérable dans le [dictionnaire](../doctrine/dict/enums.csv).

La valeur énumérable DOIT exister dans le dictionnaire.

Les énumérations DOIVENT exister dans le dictionnaires, sans exception ni ajout.

### `discriminator`

[Open API Spec](https://spec.openapis.org/oas/v3.2.0.html#discriminator-object)

### `readOnly`

[Open API Spec](https://spec.openapis.org/oas/v3.2.0.html#validating-readonly-and-writeonly)

Une propriété `readOnly` ne DEVRAIT pas être renseignée par le client et sera ignorée.

Une propriété `readOnly` est toujours déterminée par le serveur (données calculées par ex.).

Une propriété `readOnly` ne DOIT PAS être présent dans le bloc `required`.

## Design

### Convention de nommage des URI

- kebab-case

### Convention de nommage des propriétés

- snake_case

### Polymorphisme

### Valeurs `null`

#### Propriété non applicable

La propriété n'est pas applicable au sous-schéma courant et DOIT être renseignée comme `null` OU ignorée.

Ces propriétés sont **systématiquement déclarées dans le schéma principal** pour faciliter la lisibilité du contrat et ne **sont pas listées dans le bloc `required`** :

```yaml
type: object
properties:
  foo:
    enum: [option-1, option-2]
  bar:
    type: [string, "null"]
required:
  - foo
oneOf:
  - title: `bar` est applicable
    type: object
    properties:
      foo:
        const: option-1
    required:
      - foo
      - bar
  - title: `bar` n'est pas applicable
    type: object
    properties:
      foo:
        const: option-2
      bar:
        const: null
    required:
      - foo
```

#### Propriété applicable mais inconnue

La propriété est applicable et DOIT être renseignée.

Ces propriétés sont déclarées dans le schéma principal et listées dans le bloc `required` :

```yaml
type: object
properties:
  foo:
    type: [string, "null"]
required:
  - foo
```
