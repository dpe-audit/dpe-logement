# Climat

## zone-climatique.csv

Zone climatique du bâtiment.

**Schéma :**

|       Champs       |        Description        |               Type                |
| :----------------: | :-----------------------: | :-------------------------------: |
| `code_departement` | Code INSEE du département | `enum(batiment:code-departement)` |
| `zone_climatique`  |      Zone climatique      |  `enum(climat:zone-climatique)`   |

**Références réglementaires :**

- Méthode 3CL-DPE - 18.1

## tbase.csv

Température extérieure de base.

**Schéma :**

|      Champs       |            Description             |              Type              |
| :---------------: | :--------------------------------: | :----------------------------: |
| `zone_climatique` |          Zone climatique           | `enum(climat:zone-climatique)` |
|    `altitude`     |      Altitude du bâtiment (m)      |            `number`            |
|      `tbase`      | Température extérieure de base (°) |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE - 18.1

## nj.csv

Nombre de jours pour chaque mois de l'année.

**Schéma :**

| Champs |         Description          |        Type         |
| :----: | :--------------------------: | :-----------------: |
| `mois` |             Mois             | `enum(commun:mois)` |
|  `nj`  | Nombre de jours dans le mois |      `number`       |

**Références réglementaires :**

- Méthode 3CL-DPE - 11.1

## sollicitations.csv

Sollicitations extérieures pour chaque mois de l'année.

**Schéma :**

|       Champs       |                                        Description                                         |              Type              |
| :----------------: | :----------------------------------------------------------------------------------------: | :----------------------------: |
|       `mois`       |                                            Mois                                            |      `enum(commun:mois)`       |
| `zone_climatique`  |                                      Zone climatique                                       | `enum(climat:zone-climatique)` |
|     `altitude`     |                                    Altitude du bâtiment                                    |            `number`            |
| `parois_anciennes` |                                Présence de parois anciennes                                |           `boolean`            |
|     `inertie`      |                                    Inertie du bâtiment                                     |   `enum(enveloppe:inertie)`    |
|       `epv`        |                                  Ensoleillement potentiel                                  |            `number`            |
|        `e`         |                        Ensoleillement reçu en période de chauffage                         |            `number`            |
|      `efr26`       | Ensoleillement reçu en période de refroidissement pour une température de consigne de 26°C |            `number`            |
|      `efr28`       | Ensoleillement reçu en période de refroidissement pour une température de consigne de 28°C |            `number`            |
|      `nref19`      |            Nombre d'heures de chauffage pour une température de consigne à 19°C            |            `number`            |
|      `nref21`      |            Nombre d'heures de chauffage pour une température de consigne à 21°C            |            `number`            |
|      `nref26`      |            Nombre d'heures de chauffage pour une température de consigne à 26°C            |            `number`            |
|      `nref28`      |            Nombre d'heures de chauffage pour une température de consigne à 28°C            |            `number`            |
|       `dh14`       |                 Degrés heures de base 14 sur la saison de chauffe complète                 |            `number`            |
|       `dh19`       |             Degrés-heures de chauffage pour une température de consigne à 19°C             |            `number`            |
|       `dh21`       |              Ensoleillement potentiel pour une température de consigne à 21°C              |            `number`            |
|       `dh26`       |              Ensoleillement potentiel pour une température de consigne à 26°C              |            `number`            |
|       `dh28`       |              Ensoleillement potentiel pour une température de consigne à 28°C              |            `number`            |
|       `tefs`       |                         Température moyenne d'eau froide sanitaire                         |            `number`            |
|       `text`       |                               Température extérieure moyenne                               |            `number`            |
|  `textmoy_clim26`  |          Température extérieure moyenne pour une température de consigne de 26°C           |            `number`            |
|  `textmoy_clim28`  |          Température extérieure moyenne pour une température de consigne de 28°C           |            `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE - 18.3

## c1.csv

Coefficients d'orientation et d'inclinaison des parois vitrées pour chaque mois de l'année.

**Schéma :**

|      Champs       |                 Description                 |                Type                 |
| :---------------: | :-----------------------------------------: | :---------------------------------: |
|      `mois`       |                    Mois                     |         `enum(commun:mois)`         |
| `zone_climatique` |               Zone climatique               |   `enum(climat:zone-climatique)`    |
|   `orientation`   |           Orientation de la baie            | `enum(enveloppe:paroi:orientation)` |
|   `inclinaison`   |         Inclinaison de la baie (°)          |              `number`               |
|       `c1`        | Coefficients d'orientation et d'inclinaison |              `number`               |

**Références réglementaires :**

- Méthode 3CL-DPE - 18.5
