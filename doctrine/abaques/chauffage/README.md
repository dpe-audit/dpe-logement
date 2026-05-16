# Chauffage

## combustion.csv

Caractéristiques de combustion des générateurs de chauffage.

**Schéma :**

|             Champs              |                        Description                        |               Type                |
| :-----------------------------: | :-------------------------------------------------------: | :-------------------------------: |
|        `type_generateur`        |                    Type de générateur                     | `enum(chauffage:type-generateur)` |
|      `energie_generateur`       |                   Énergie du générateur                   |      `enum(commun:energie)`       |
|        `mode_combustion`        |                    Mode de combustion                     | `enum(chauffage:mode-combustion)` |
| `annee_installation_generateur` |            Année d'installation du générateur             |             `integer`             |
|              `pn`               |           Puissance nominale du générateur (kW)           |             `number`              |
|            `pn_max`             |       Puissance nominale maximale de la plage (kW)        |             `number`              |
|              `rpn`              |    Rendement à pleine charge (formule ou valeur fixe)     |             `number`              |
|             `rpint`             | Rendement à charge intermédiaire (formule ou valeur fixe) |             `number`              |
|              `qp0`              |            Pertes à l'arrêt du brûleur (% Pn)             |             `number`              |
|          `pveilleuse`           |               Puissance de la veilleuse (W)               |             `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §13

## fch.csv

Facteur de couverture solaire pour le chauffage.

**Schéma :**

|      Champs       |               Description               |              Type              |
| :---------------: | :-------------------------------------: | :----------------------------: |
| `zone_climatique` |             Zone climatique             | `enum(climat:zone-climatique)` |
|  `type_batiment`  |            Type de bâtiment             |     `enum(batiment:type)`      |
|       `fch`       | Facteur de couverture solaire chauffage |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §9

## i0.csv

Facteur d'intermittence de chauffage.

**Schéma :**

|         Champs         |             Description             |                 Type                 |
| :--------------------: | :---------------------------------: | :----------------------------------: |
|    `type_batiment`     |          Type de bâtiment           |        `enum(batiment:type)`         |
|    `type_emission`     |    Type d'émetteur de chauffage     |   `enum(chauffage:type-emission)`    |
|  `type_intermittence`  |        Type d'intermittence         | `enum(chauffage:type-intermittence)` |
|  `chauffage_central`   |    Système de chauffage central     |              `boolean`               |
| `regulation_terminale` | Présence d'une régulation terminale |              `boolean`               |
| `chauffage_collectif`  |   Système de chauffage collectif    |              `boolean`               |
|    `inertie_lourde`    |      Bâtiment à inertie lourde      |              `boolean`               |
| `comptage_individuel`  |  Présence d'un comptage individuel  |              `boolean`               |
|          `i0`          |       Facteur d'intermittence       |               `number`               |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §8

## paux.csv

Puissance auxiliaire des générateurs de chauffage.

**Schéma :**

|           Champs            |                           Description                            |               Type                |
| :-------------------------: | :--------------------------------------------------------------: | :-------------------------------: |
|      `type_generateur`      |                        Type de générateur                        | `enum(chauffage:type-generateur)` |
|    `energie_generateur`     |                      Énergie du générateur                       |      `enum(commun:energie)`       |
| `generateur_multi_batiment` |            Générateur desservant plusieurs bâtiments             |             `boolean`             |
|     `presence_ventouse`     |                     Présence d'une ventouse                      |             `boolean`             |
|             `G`             |     Coefficient constant de la formule paux = G + H × Pn (W)     |             `number`              |
|             `H`             | Coefficient proportionnel de la formule paux = G + H × Pn (W/kW) |             `number`              |
|          `pn_max`           |           Puissance nominale maximale de la plage (kW)           |             `number`              |
|           `paux`            |  Puissance auxiliaire fixe lorsque non calculée par formule (W)  |             `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §15

## pn.csv

Puissance nominale de la chaudière.

**Schéma :**

|             Champs              |                     Description                      |                 Type                 |
| :-----------------------------: | :--------------------------------------------------: | :----------------------------------: |
|      `position_chaudiere`       |               Position de la chaudière               | `enum(chauffage:position-chaudiere)` |
|             `pdim`              |  Puissance de dimensionnement de la chaudière (kW)   |               `number`               |
| `annee_installation_generateur` |         Année d'installation de la chaudière         |              `integer`               |
|              `pn`               |   Puissance nominale (valeur fixe ou formule, kW)    |               `number`               |
|     `type_chaudiere_defaut`     | Type de chaudière à retenir par défaut pour la plage | `enum(chauffage:position-chaudiere)` |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §13

## rd.csv

Rendement de distribution du chauffage.

**Schéma :**

|            Champs             |                   Description                   |                    Type                    |
| :---------------------------: | :---------------------------------------------: | :----------------------------------------: |
|      `type_distribution`      |         Type de réseau de distribution          |    `enum(chauffage:type-distribution)`     |
|  `temperature_distribution`   |      Température du réseau de distribution      | `enum(chauffage:temperature-distribution)` |
| `presence_fluide_frigorigene` | Présence d'un fluide frigorigène dans le réseau |                 `boolean`                  |
|      `reseau_collectif`       |        Réseau de distribution collectif         |                 `boolean`                  |
|      `isolation_reseau`       |           État d'isolation du réseau            |                 `boolean`                  |
|             `rd`              |            Rendement de distribution            |                  `number`                  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §12

## re.csv

Rendement des émetteurs de chauffage.

**Schéma :**

|       Champs       |         Description          |                Type                |
| :----------------: | :--------------------------: | :--------------------------------: |
|  `type_emission`   | Type d'émetteur de chauffage |  `enum(chauffage:type-emission)`   |
| `type_generateur`  |      Type de générateur      | `enum(chauffage:type-generateur)`  |
| `label_generateur` |     Label du générateur      | `enum(chauffage:label-generateur)` |
|        `re`        |   Rendement de l'émetteur    |              `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §12

## rg.csv

Rendement de génération des générateurs de chauffage.

**Schéma :**

|             Champs              |            Description             |                Type                |
| :-----------------------------: | :--------------------------------: | :--------------------------------: |
|        `type_generateur`        |         Type de générateur         | `enum(chauffage:type-generateur)`  |
|      `energie_generateur`       |       Énergie du générateur        |       `enum(commun:energie)`       |
|       `label_generateur`        |        Label du générateur         | `enum(chauffage:label-generateur)` |
| `annee_installation_generateur` | Année d'installation du générateur |             `integer`              |
|              `rg`               |      Rendement de génération       |              `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §12

## rr.csv

Rendement de régulation des émetteurs de chauffage.

**Schéma :**

|              Champs               |             Description              |                Type                |
| :-------------------------------: | :----------------------------------: | :--------------------------------: |
|          `type_emission`          |     Type d'émetteur de chauffage     |  `enum(chauffage:type-emission)`   |
|         `type_generateur`         |          Type de générateur          | `enum(chauffage:type-generateur)`  |
|        `label_generateur`         |         Label du générateur          | `enum(chauffage:label-generateur)` |
|        `reseau_collectif`         |   Réseau de distribution collectif   |             `boolean`              |
| `presence_robinet_thermostatique` | Présence de robinets thermostatiques |             `boolean`              |
|  `presence_regulation_terminale`  | Présence d'une régulation terminale  |             `boolean`              |
|               `rr`                |       Rendement de régulation        |              `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §12

## scop.csv

SCOP ou COP des pompes à chaleur pour le chauffage.

**Schéma :**

|             Champs              |                               Description                               |               Type                |
| :-----------------------------: | :---------------------------------------------------------------------: | :-------------------------------: |
|        `zone_climatique`        |                             Zone climatique                             |  `enum(climat:zone-climatique)`   |
|        `type_generateur`        |                           Type de générateur                            | `enum(chauffage:type-generateur)` |
|         `type_emetteur`         |                      Type d'émetteur de chauffage                       |  `enum(chauffage:type-emetteur)`  |
| `annee_installation_generateur` |                   Année d'installation du générateur                    |             `integer`             |
|           `scop_cop`            |                    Type de coefficient (scop ou cop)                    |              `text`               |
|             `scop`              | Coefficient de performance saisonnier ou ponctuel de la pompe à chaleur |             `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §9

## tfonc100.csv

Température de fonctionnement des émetteurs à pleine charge (100%).

**Schéma :**

|            Champs             |                    Description                     |                    Type                    |
| :---------------------------: | :------------------------------------------------: | :----------------------------------------: |
|  `temperature_distribution`   |       Température du réseau de distribution        | `enum(chauffage:temperature-distribution)` |
| `annee_installation_emetteur` |         Année d'installation de l'émetteur         |                 `integer`                  |
|          `tfonc100`           | Température de fonctionnement à pleine charge (°C) |                  `number`                  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §13

## tfonc30.csv

Température de fonctionnement des émetteurs à charge partielle (30%).

**Schéma :**

|             Champs              |                      Description                      |                    Type                    |
| :-----------------------------: | :---------------------------------------------------: | :----------------------------------------: |
|        `mode_combustion`        |                  Mode de combustion                   |     `enum(chauffage:mode-combustion)`      |
|   `temperature_distribution`    |         Température du réseau de distribution         | `enum(chauffage:temperature-distribution)` |
|  `annee_installation_emetteur`  |          Année d'installation de l'émetteur           |                 `integer`                  |
| `annee_installation_generateur` |          Année d'installation du générateur           |                 `integer`                  |
|            `tfonc30`            | Température de fonctionnement à charge partielle (°C) |                  `number`                  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §13
