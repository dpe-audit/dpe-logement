# Ventilation

## debits.csv

Débits conventionnels des installations de ventilation.

**Schéma :**

|             Champs             |                       Description                       |           Type           |
| :----------------------------: | :-----------------------------------------------------: | :----------------------: |
|       `type_ventilation`       |                   Type de ventilation                   | `enum(ventilation:type)` |
| `presence_echangeur_thermique` |            Présence d'un échangeur thermique            |        `boolean`         |
|     `generateur_collectif`     |         Présence d'une installation collective          |        `boolean`         |
|      `annee_installation`      |     Année d'installation du système de ventilation      |        `integer`         |
|         `qvarep_conv`          |  Débit volumique conventionnel à reprendre (m3/(h.m2))  |         `number`         |
|         `qvasouf_conv`         |  Débit volumique conventionnel à souffler (m3/(h.m2))   |         `number`         |
|          `smea_conv`           | Somme des modules d'entrée d'air sous 20 Pa (m3/(h.m2)) |         `number`         |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §4

## pvent_moy.csv

Puissances moyennes des auxiliaires de ventilation.

**Schéma :**

|        Champs        |                     Description                      |           Type           |
| :------------------: | :--------------------------------------------------: | :----------------------: |
|  `type_ventilation`  |                 Type de ventilation                  | `enum(ventilation:type)` |
| `annee_installation` |    Année d'installation du système de ventilation    |        `integer`         |
|     `pvent_moy`      | Puissance moyenne de l'auxiliaire de ventilation (W) |         `number`         |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §5

## pvent.csv

Puissances des auxiliaires de ventilation.

**Schéma :**

|        Champs        |                  Description                   |           Type           |
| :------------------: | :--------------------------------------------: | :----------------------: |
|  `type_ventilation`  |              Type de ventilation               | `enum(ventilation:type)` |
| `annee_installation` | Année d'installation du système de ventilation |        `integer`         |
|       `pvent`        |  Puissance de l'auxiliaire de ventilation (W)  |         `number`         |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §5
