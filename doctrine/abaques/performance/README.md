# Éclairage

## etiquette-climat.csv

Table de classification des étiquettes Climat.

**Schéma :**

|       Champs       |                    Description                    |              Type              |
| :----------------: | :-----------------------------------------------: | :----------------------------: |
| `zone_climatique`  |                  Zone climatique                  | `enum(climat:zone-climatique)` |
|     `altitude`     |             Altitude du bâtiment (m)              |            `number`            |
|       `eges`       | Emissions de gaz à effet de serre (kgCO2eq/m²/an) |            `number`            |
| `etiquette_climat` |                 Etiquette climat                  | `enum(performance:etiquette)`  |

**Références réglementaires :**

- Arrêté du 31 mars 2021 - Annexe 5

## etiquette-energie.csv

Table de classification des étiquettes Energie.

**Schéma :**

|       Champs        |                    Description                    |              Type              |
| :-----------------: | :-----------------------------------------------: | :----------------------------: |
|  `zone_climatique`  |                  Zone climatique                  | `enum(climat:zone-climatique)` |
|     `altitude`      |             Altitude du bâtiment (m)              |            `number`            |
|        `cep`        |   Consommation d'énergie primaire (kWhep/m²/an)   |            `number`            |
|       `eges`        | Emissions de gaz à effet de serre (kgCO2eq/m²/an) |            `number`            |
| `etiquette_energie` |                 Etiquette climat                  | `enum(performance:etiquette)`  |

**Références réglementaires :**

- Arrêté du 31 mars 2021 - Annexe 5

## fcep.csv

Facteur de conversion des consommations d'énergie finale en énergie primaire.

**Schéma :**

|  Champs   |             Description              |          Type          |
| :-------: | :----------------------------------: | :--------------------: |
| `energie` |               Energie                | `enum(commun:energie)` |
|  `fcep`   | Facteur de conversion kWhef -> kWhep |        `number`        |

**Références réglementaires :**

- Arrêté du 15 septembre 2006 - Annexe 3

## feges.csv

Facteur de conversion des consommations d'énergie finale en émissions de gaz à effet de serre.

**Schéma :**

|  Champs   |              Description               |          Type          |
| :-------: | :------------------------------------: | :--------------------: |
| `energie` |                Energie                 | `enum(commun:energie)` |
|  `usage`  |                 Usage                  |  `enum(commun:usage)`  |
|  `feges`  | Facteur de conversion kWhef -> kgCO2eq |        `number`        |

**Références réglementaires :**

- Arrêté du 15 septembre 2006 - Annexe 4
