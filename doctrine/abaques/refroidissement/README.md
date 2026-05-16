# Refroidissement

## eer.csv

Coefficient d'efficience énergétique des générateurs de refroidissement.

**Schéma :**

|        Champs        |                   Description                   |              Type              |
| :------------------: | :---------------------------------------------: | :----------------------------: |
|  `zone_climatique`   |                 Zone climatique                 | `enum(climat:zone-climatique)` |
| `annee_installation` |       Année d'installation du générateur        |           `integer`            |
|        `seer`        | Coefficient d'efficience énergétique saisonnier |            `number`            |
|        `eer`         |      Coefficient d'efficience énergétique       |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §10.3
