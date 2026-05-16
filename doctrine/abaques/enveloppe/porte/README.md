# Porte

## u.csv

Coefficient de transmission thermique de la porte.

**Schéma :**

|     Champs     |                         Description                          |                      Type                      |
| :------------: | :----------------------------------------------------------: | :--------------------------------------------: |
| `presence_sas` |                      Présence d'un sas                       |                   `boolean`                    |
|   `materiau`   |                     Matériau de la porte                     |        `enum(enveloppe:porte:materiau)`        |
|  `isolation`   |                   Présence d'une isolation                   |                   `boolean`                    |
| `type_vitrage` |                       Type de vitrage                        | `enum(enveloppe:enveloppe:porte:type-vitrage)` |
| `taux_vitrage` |                       Taux de vitrage                        |                   `integer`                    |
|      `u`       | Coefficient de transmission thermique de la porte (W/(m²·K)) |                    `number`                    |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.3
