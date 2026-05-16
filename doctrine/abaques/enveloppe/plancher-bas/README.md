# Plancher bas

## u0.csv

Coefficient de transmission thermique du plancher bas non isolé.

**Schéma :**

|      Champs      |                                Description                                 |  Type  |
| :--------------: | :------------------------------------------------------------------------: | :----: |
| `type_structure` |                     Type de structure du plancher bas                      | `enum(enveloppe:plancher-bas:type)` |
|       `u0`       | Coefficient de transmission thermique du plancher bas non isolé (W/(m²·K)) | `number` |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.2

## u.csv

Coefficient de transmission thermique conventionnel du plancher bas.

**Schéma :**

|             Champs             |                          Description                           |  Type   |
| :----------------------------: | :------------------------------------------------------------: | :-----: |
|       `zone_climatique`        |                        Zone climatique                         | `enum(climat:zone-climatique)` |
| `annee_construction_isolation` |              Année de construction ou d'isolation              | `integer` |
|         `effet_joule`          |                Bâtiment chauffé par effet joule                | `boolean` |
|              `u`               | Coefficient de transmission thermique conventionnel (W/(m²·K)) | `number`  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.2

## ue.csv

Coefficient de transmission thermique équivalent du plancher bas en contact avec le sol.

**Schéma :**

|        Champs        |                           Description                            |  Type   |
| :------------------: | :--------------------------------------------------------------: | :-----: |
|    `mitoyennete`     |                   Type de contact avec le sol                    | `enum(enveloppe:paroi:mitoyennete)` |
| `annee_construction` |                      Année de construction                       | `integer` |
|        `2s/p`        |               Rapport surface / demi-périmètre (m)               | `number`  |
|         `u`          | Coefficient de transmission thermique du plancher bas (W/(m²·K)) | `number`  |
|         `ue`         |   Coefficient de transmission thermique équivalent (W/(m²·K))    | `number`  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.2.2
