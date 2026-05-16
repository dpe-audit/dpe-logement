# Eau chaude sanitaire

## combustion.csv

Caractéristiques de combustion des générateurs d'eau chaude sanitaire.

**Schéma :**

|             Champs              |                    Description                     |            Type             |
| :-----------------------------: | :------------------------------------------------: | :-------------------------: |
|        `type_generateur`        |                 Type de générateur                 | `enum(ecs:type-generateur)` |
|      `energie_generateur`       |               Énergie du générateur                |   `enum(commun:energie)`    |
|        `mode_combustion`        |                 Mode de combustion                 | `enum(ecs:mode-combustion)` |
|        `volume_stockage`        |          Volume du ballon de stockage (L)          |          `integer`          |
| `annee_installation_generateur` |         Année d'installation du générateur         |          `integer`          |
|              `pn`               |       Puissance nominale du générateur (kW)        |          `number`           |
|            `pn_max`             |    Puissance nominale maximale de la plage (kW)    |          `number`           |
|              `rpn`              | Rendement à pleine charge (formule ou valeur fixe) |          `number`           |
|              `qp0`              |         Pertes à l'arrêt du brûleur (% Pn)         |          `number`           |
|          `pveilleuse`           |           Puissance de la veilleuse (W)            |          `number`           |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §14

## cop.csv

Coefficient de performance des générateurs thermodynamiques d'eau chaude sanitaire.

**Schéma :**

|             Champs              |                 Description                  |              Type              |
| :-----------------------------: | :------------------------------------------: | :----------------------------: |
|        `zone_climatique`        |               Zone climatique                | `enum(climat:zone-climatique)` |
|        `type_generateur`        |              Type de générateur              |  `enum(ecs:type-generateur)`   |
| `annee_installation_generateur` |      Année d'installation du générateur      |           `integer`            |
|              `cop`              | Coefficient de performance du générateur ECS |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §14

## cr.csv

Coefficient de pertes de stockage de l'eau chaude sanitaire.

**Schéma :**

|         Champs         |                  Description                  |               Type               |
| :--------------------: | :-------------------------------------------: | :------------------------------: |
| `position_chauffe_eau` | Position du chauffe-eau (horizontal/vertical) | `enum(ecs:position-chauffe-eau)` |
|   `label_generateur`   |      Label de performance du chauffe-eau      |   `enum(ecs:label-generateur)`   |
|   `volume_stockage`    |       Volume du ballon de stockage (L)        |            `integer`             |
|          `cr`          |    Coefficient de pertes de stockage (W/K)    |             `number`             |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §11

## fecs.csv

Facteur de couverture solaire pour l'eau chaude sanitaire.

**Schéma :**

|          Champs           |                Description                 |              Type              |
| :-----------------------: | :----------------------------------------: | :----------------------------: |
|      `type_batiment`      |              Type de bâtiment              |     `enum(batiment:type)`      |
|     `zone_climatique`     |              Zone climatique               | `enum(climat:zone-climatique)` |
|      `usage_solaire`      |    Usage couvert par le système solaire    |   `enum(ecs:usage-solaire)`    |
| `anciennete_installation` | Ancienneté de l'installation solaire (ans) |           `integer`            |
|          `fecs`           |     Facteur de couverture solaire ECS      |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §11

## paux.csv

Puissance auxiliaire des générateurs d'eau chaude sanitaire.

**Schéma :**

|        Champs        |                           Description                            |            Type             |
| :------------------: | :--------------------------------------------------------------: | :-------------------------: |
|  `type_generateur`   |                        Type de générateur                        | `enum(ecs:type-generateur)` |
| `energie_generateur` |                      Énergie du générateur                       |   `enum(commun:energie)`    |
| `presence_ventouse`  |                     Présence d'une ventouse                      |          `boolean`          |
|         `G`          |     Coefficient constant de la formule paux = G + H × Pn (W)     |          `number`           |
|         `H`          | Coefficient proportionnel de la formule paux = G + H × Pn (W/kW) |          `number`           |
|        `paux`        |  Puissance auxiliaire fixe lorsque non calculée par formule (W)  |          `number`           |
|       `pn_max`       |           Puissance nominale maximale de la plage (kW)           |          `number`           |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §15

## rd.csv

Rendement de distribution de l'eau chaude sanitaire.

**Schéma :**

|            Champs             |                           Description                           |            Type             |
| :---------------------------: | :-------------------------------------------------------------: | :-------------------------: |
|      `reseau_collectif`       |                Réseau de distribution collectif                 |          `boolean`          |
|       `bouclage_reseau`       |                   Type de bouclage du réseau                    | `enum(ecs:bouclage-reseau)` |
|    `alimentation_contigue`    | Alimentation contiguë (production et point de puisage contigus) |          `boolean`          |
| `production_volume_habitable` |        Production d'ECS située dans le volume habitable         |          `boolean`          |
|             `rd`              |                    Rendement de distribution                    |          `number`           |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §11

## rg.csv

Rendement de génération des générateurs d'eau chaude sanitaire.

**Schéma :**

|        Champs        |       Description       |            Type             |
| :------------------: | :---------------------: | :-------------------------: |
|  `type_generateur`   |   Type de générateur    | `enum(ecs:type-generateur)` |
| `energie_generateur` |  Énergie du générateur  |   `enum(commun:energie)`    |
|         `rg`         | Rendement de génération |          `number`           |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §14
