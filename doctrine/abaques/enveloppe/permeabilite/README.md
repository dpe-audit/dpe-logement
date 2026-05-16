# Perméabilité

## q4paconv.csv

Valeur conventionnelle de la perméabilité à l'air sous 4 Pa de l'enveloppe.

**Schéma :**

|            Champs            |                           Description                            |         Type          |
| :--------------------------: | :--------------------------------------------------------------: | :-------------------: |
|       `type_batiment`        |                         Type de bâtiment                         | `enum(batiment:type)` |
|     `annee_construction`     |                Année de construction du bâtiment                 |       `integer`       |
| `presence_joints_menuiserie` | Présence de joints sur plus de 50 % de la surface de menuiseries |       `boolean`       |
|  `isolation_murs_plafonds`   | Isolation des murs et/ou plafonds sur plus de 50 % des surfaces  |       `boolean`       |
|         `q4pa_conv`          | Valeur conventionnelle de la perméabilité sous 4 Pa (m³/(h·m²))  |       `number`        |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §4
