# Paroi

## b.csv

Coefficient de réduction des déperditions thermiques.

**Schéma :**

|    Champs     |                     Description                      |                Type                 |
| :-----------: | :--------------------------------------------------: | :---------------------------------: |
| `mitoyennete` |                Mitoyeneté de la paroi                | `enum(enveloppe:paroi:mitoyennete)` |
|      `b`      | Coefficient de réduction des déperditions thermiques |              `number`               |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.1

## bver.csv

Coefficient de réduction des déperditions thermiques des parois donnant sur un espace tampon solarisé.

**Schéma :**

|     Champs      |                            Description                            |              Type              |
| :-------------: | :---------------------------------------------------------------: | :----------------------------: |
| zone_climatique |                          Zone climatique                          | `enum(climat:zone-climatique)` |
| orientation_ets |        Orientation majoritaire de l'espace tampon solarisé        |   `enum(commun:orientation)`   |
| isolation_paroi | État d'isolation de la paroi donnant sur l'espace tampon solarisé |           `boolean`            |
|      bver       |       Coefficient de réduction des déperditions thermiques        |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.1
