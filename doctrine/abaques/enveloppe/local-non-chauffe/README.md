# Local non chauffé

## uvue.csv

Coefficient surfacique équivalent du local non chauffé.

**Schéma :**

|          Champs          |                 Description                  |                   Type                   |
| :----------------------: | :------------------------------------------: | :--------------------------------------: |
| `type_local_non_chauffe` |          Type de local non chauffé           | `enum(enveloppe:local-non-chauffe:type)` |
|          `uvue`          | Coefficient surfacique équivalent (W/(m²·K)) |                 `number`                 |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.1

## b.csv

Coefficient de réduction des déperditions thermiques du local non chauffé.

**Schéma :**

|     Champs      |                       Description                       |   Type    |
| :-------------: | :-----------------------------------------------------: | :-------: |
|     `uvue`      |      Coefficient surfacique équivalent (W/(m²·K))       | `number`  |
| `isolation_aiu` | Isolation des parois donnant sur l'espace chauffé (Aiu) | `boolean` |
| `isolation_aue` |   Isolation des parois donnant sur l'extérieur (Aue)    | `boolean` |
|    `aiu_aue`    |                      Ratio Aiu/Aue                      | `number`  |
|       `b`       |  Coefficient de réduction des déperditions thermiques   | `number`  |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.1

## t.csv

Coefficient de transparence de l'espace tampon solarisé.

**Schéma :**

|              Champs               |                       Description                       |               Type                |
| :-------------------------------: | :-----------------------------------------------------: | :-------------------------------: |
|          `type_vitrage`           |                     Type de vitrage                     |  `enum(enveloppe:vitrage:type)`   |
|            `materiau`             |                Matériau de la menuiserie                | `enum(enveloppe:baie:menuiserie)` |
| `presence_rupteur_pont_thermique` |         Présence d'un rupteur de pont thermique         |             `boolean`             |
|                `t`                | Coefficient de transparence de l'espace tampon solarisé |             `number`              |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.1

**Point de fuite :**

- [#44 Coefficient de transparence des parois en verre](https://github.com/dpe-audit/doctrine/issues/44)
