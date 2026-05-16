# Baie

## deltar.csv

Résistance thermique additionnelle due aux fermetures occultantes.

**Schéma :**

|      Champs      |                 Description                 |                 Type                  |
| :--------------: | :-----------------------------------------: | :-----------------------------------: |
| `type_fermeture` |        Type de fermeture occultante         | `enum(enveloppe:baie:type-fermeture)` |
|     `deltar`     | Résistance thermique additionnelle (m²·K/W) |               `number`                |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.3

## ug.csv

Coefficient de transmission thermique du vitrage.

**Schéma :**

|        Champs         |                         Description                         |                  Type                  |
| :-------------------: | :---------------------------------------------------------: | :------------------------------------: |
|    `type_vitrage`     |                       Type de vitrage                       |  `enum(enveloppe:baie:type-vitrage)`   |
|   `type_survitrage`   |                     Type de survitrage                      | `enum(enveloppe:baie:type-survitrage)` |
|      `type_baie`      |                        Type de baie                         |      `enum(enveloppe:baie:type)`       |
|   `nature_lame_air`   |                   Nature de la lame d'air                   | `enum(enveloppe:baie:nature-lame-air)` |
| `epaisseur_lame_air`  |               Épaisseur de la lame d'air (mm)               |               `integer`                |
| `inclinaison_vitrage` |                 Inclinaison du vitrage (°)                  |               `integer`                |
|         `ug`          | Coefficient de transmission thermique du vitrage (W/(m²·K)) |                `number`                |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.3

## uw.csv

Coefficient de transmission thermique de la menuiserie.

**Schéma :**

|          Champs          |                            Description                            |              Type               |
| :----------------------: | :---------------------------------------------------------------: | :-----------------------------: |
|       `type_baie`        |                           Type de baie                            |   `enum(enveloppe:baie:type)`   |
|      `soubassement`      |                    Présence d'un soubassement                     |            `boolean`            |
|        `materiau`        |                     Matériau de la menuiserie                     | `enum(enveloppe:baie:materiau)` |
| `rupteur_pont_thermique` |              Présence d'un rupteur de pont thermique              |            `boolean`            |
|           `ug`           |    Coefficient de transmission thermique du vitrage (W/(m²·K))    |            `number`             |
|           `uw`           | Coefficient de transmission thermique de la menuiserie (W/(m²·K)) |            `number`             |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.3

## ujn.csv

Coefficient de transmission thermique de la menuiserie avec fermetures.

**Schéma :**

|  Champs  |                                    Description                                    |   Type   |
| :------: | :-------------------------------------------------------------------------------: | :------: |
| `deltar` |            Résistance thermique additionnelle des fermetures (m²·K/W)             | `number` |
|   `uw`   |         Coefficient de transmission thermique de la menuiserie (W/(m²·K))         | `number` |
|  `ujn`   | Coefficient de transmission thermique de la menuiserie avec fermetures (W/(m²·K)) | `number` |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.3

## sw.csv

Coefficient de transmission solaire de la baie.

**Schéma :**

|         Champs          |                  Description                   |                   Type                    |
| :---------------------: | :--------------------------------------------: | :---------------------------------------: |
|       `type_baie`       |                  Type de baie                  |        `enum(enveloppe:baie:type)`        |
| `presence_soubassement` |           Présence d'un soubassement           |                 `boolean`                 |
|       `materiau`        |           Matériau de la menuiserie            |      `enum(enveloppe:baie:materiau)`      |
|     `type_vitrage`      |                Type de vitrage                 |      `enum(enveloppe:vitrage:type)`       |
|       `type_pose`       |            Type de pose de la baie             |     `enum(enveloppe:paroi:type-pose)`     |
|    `type_survitrage`    |               Type de survitrage               | `enum(enveloppe:vitrage:type-survitrage)` |
|          `sw`           | Coefficient de transmission solaire de la baie |                 `number`                  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.3
