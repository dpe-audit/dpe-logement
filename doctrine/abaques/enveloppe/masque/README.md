# Masque

## fe1.csv

Facteur d'ensoleillement des masques proches.

**Schéma :**

|       Champs       |       Description        |             Type              |
| :----------------: | :----------------------: | :---------------------------: |
|    type_masque     |      Type de masque      | `enum(enveloppe:masque:type)` |
| orientation_facade | Orientation de la façade |  `enum(commun:orientation)`   |
|   avancee_masque   |  Avancée du masque (l)   |           `number`            |
|        fe1         | Facteur d'ensoleillement |           `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §6.2.2.1

## fe2.csv

Facteur d'ensoleillement des masques lointains homogènes.

**Schéma :**

|        Champs        |       Description        |             Type              |
| :------------------: | :----------------------: | :---------------------------: |
|     type_masque      |      Type de masque      | `enum(enveloppe:masque:type)` |
|  orientation_facade  | Orientation de la façade |  `enum(commun:orientation)`   |
| hauteur_masque_alpha |  Hauteur du masque (°)   |           `number`            |
|         fe2          | Facteur d'ensoleillement |           `number`            |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §6.2.2.2.1

## omb.csv

Coefficient d'ombrage des masques lointains non homogènes.

**Schéma :**

|        Champs        |       Description        |               Type               |
| :------------------: | :----------------------: | :------------------------------: |
|     type_masque      |      Type de masque      |  `enum(enveloppe:masque:type)`   |
|  orientation_facade  | Orientation de la façade |    `enum(commun:orientation)`    |
| secteur_orientation  |  Secteur d'orientation   | `enum(enveloppe:masque:secteur)` |
| hauteur_masque_alpha |  Hauteur du masque (°)   |             `number`             |
|         omb          |  Coefficient d'ombrage   |             `number`             |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §6.2.2.2.2
