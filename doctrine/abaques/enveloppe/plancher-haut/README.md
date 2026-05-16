# Plancher haut

## u0.csv

Coefficient de transmission thermique du plancher haut non isolé.

**Schéma :**

|        Champs        |                                 Description                                 |                 Type                 |
| :------------------: | :-------------------------------------------------------------------------: | :----------------------------------: |
| `type_plancher_haut` |                            Type de plancher haut                            | `enum(enveloppe:plancher-haut:type)` |
|         `u0`         | Coefficient de transmission thermique du plancher haut non isolé (W/(m²·K)) |               `number`               |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.3

## u.csv

Coefficient de transmission thermique conventionnel du plancher haut.

**Schéma :**

|             Champs             |                          Description                           |                     Type                      |
| :----------------------------: | :------------------------------------------------------------: | :-------------------------------------------: |
|        `configuration`         |                 Configuration du plancher haut                 | `enum(enveloppe:plancher-haut:configuration)` |
|       `zone_climatique`        |                        Zone climatique                         |        `enum(climat:zone-climatique)`         |
|         `effet_joule`          |                Bâtiment chauffé par effet joule                |                   `boolean`                   |
| `annee_construction_isolation` |              Année de construction ou d'isolation              |                   `integer`                   |
|              `u`               | Coefficient de transmission thermique conventionnel (W/(m²·K)) |                   `number`                    |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.3
