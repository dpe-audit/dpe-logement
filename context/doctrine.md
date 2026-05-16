---
paths: [/doctrine]
---

# Doctrine réglementaire et extra-réglementaire

## Rôle

- Centraliser l'ensemble des ressources réglementaires relatives au Diagnostic de Performance Energétique
- Centraliser l'ensemble des ressource extra-réglementaires (interprétations, correctifs)

## Organisation

```text
doctrine/
├── <version>/
│   ├── abaques/                    # Tables de valeurs conventionnelles (3CL-DPE)
│   ├── corpus /                    # Documentation réglementaire
│   ├── dict/                       # Dictionnaire
│   └── extras/                     # Documentation extra-réglementaire
```

## Abaques

### Spécifications

- CSV
- Encodage UTF-8
- Séparateur ";"

### En-têtes

- Snake case
- Minuscules sans accents

### En tête de comparaison

- `<filtre>/eq` : Équivalent à
- `<filtre>/lt` : Inférieur à
- `<filtre>/lte` : Inférieur ou égal à
- `<filtre>/gt` : Supérieur à
- `<filtre>/gte` : Supérieur ou égal à

## Corpus

La documentation présente dans le corpus est la source de vérité unique applicable à l'ensemble du projet.

Le corpus peut être étendu ou corrigé par une [doctrine extra-réglementaire](#doctrine-extra-réglementaire).

## Dictionnaire

Le dictionnaire détermine un vocabulaire commun pour l'ensemble du projet.

### Valeurs énumérables et énumérations

Une valeur énumérable, ou enum, est une liste fermée d'énumérations.

La liste des valeurs énumérables et des énumérations associées est accessible dans le fichier [enums.csv](./dict/enums.csv).

#### Identifiant

Une valeur énumérable est identifiée par un ID unique au format `^([a-z-]+:)*([a-z-]+)$`.

Une énumération est décrite au format `^[a-zA-Z0-9-]+$`.

Une énumération est identifiée par un ID unique au format `<enum>:<enumeration>`.

#### Références

Toutes les références à une valeur énumérable dans le projet (abaques, extras, schemas) doivent être identifiables dans le dictionnaire.

Par convention, une référence est identifiée par la notation `enum(enum-id)` ou `enum(enumeration-id)` pour cibler une énumération précise.

## Doctrine extra-réglementaire

Le corpus extra-réglementaire (`doctrine/corpus/extra/`) est une contribution communautaire structurée en deux catégories :

| Catégorie      | Définition                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------ |
| `corrections/` | Amendements visant à corriger des biais ou erreurs identifiés dans la méthode officielle 3CL-DPE |
| `extensions/`  | Propositions visant à améliorer ou étendre la méthode officielle                                 |

Chaque contribution doit préciser son statut (ex. : `draft`, `proposed`, `accepted`) dans son frontmatter YAML.
