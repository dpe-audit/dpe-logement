---
paths:
    - /doctrine/abaques
    - /packages/abaques
---

# Abaques

## Contexte

- Les abaques sont les tables de valeurs conventionnelles issues de la méthode 3CL-DPE 2021
- Les abaques sont définies dans `/doctrine/abaques`

## Usages

- Les abaques sont exposées dans `/packages/abaques`

## Commandes

```bash
abaques:generate    # Génère les fichiers compilés dans `/packages/abaques/data
```

## Organisation

```text
/doctrine
├── abaques/                        # Source de vérité
└── packages/
    └── abaques/src/
        ├── data/                   # Fichiers compilés générés automatiquement
        └── repositories/           # Points d'entrée des abaques
```

## Spécifications

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

## Compilation

Les abaques dans `/doctrine/abaques` sont compilées automatiquement dans `/packages/abaques`.
