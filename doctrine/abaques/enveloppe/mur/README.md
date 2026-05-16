# Mur

## u.csv

Coefficient de transmission thermique du mur.

**Schéma :**

|             Champs             |              Description              |              Type              |
| :----------------------------: | :-----------------------------------: | :----------------------------: |
|       `zone_climatique`        |            Zone climatique            | `enum(climat:zone-climatique)` |
| `annee_construction_isolation` | Année de construction ou d'isolation  |           `integer`            |
|         `effet_joule`          |   Bâtiment chauffé par effet joule    |           `boolean`            |
|              `u`               | Coefficient de transmission thermique |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.1.1

## u0-doublage.csv

Coefficient de transmission thermique additionnel du doublage.

**Schéma :**

|     Champs      |                    Description                    |                Type                 |
| :-------------: | :-----------------------------------------------: | :---------------------------------: |
| `type_doublage` |                 Type de doublage                  | `enum(enveloppe:mur:type-doublage)` |
|  `u0_doublage`  | Coefficient de transmission thermique additionnel |              `number`               |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.1.2

## u0.csv

Coefficient de transmission thermique du mur nu.

**Schéma :**

|        Champs        |              Description              |            Type            |
| :------------------: | :-----------------------------------: | :------------------------: |
|      `type_mur`      |              Type de mur              | `enum(enveloppe:mur:type)` |
|   `epaisseur_mur`    |         Epaisseur du mur (cm)         |          `number`          |
| `annee_construction` |     Année de construction du mur      |         `integer`          |
|         `u0`         | Coefficient de transmission thermique |          `number`          |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.1.2
