# Pont thermique

## kpt.csv

Valeur du pont thermique linéique.

**Schéma :**

|           Champs            |                 Description                 |                 Type                  |
| :-------------------------: | :-----------------------------------------: | :-----------------------------------: |
|       `type_liaison`        |        Type de liaison constructive         | `enum(enveloppe:pont-thermique:type)` |
|       `isolation_mur`       |     Présence d'une isolation sur le mur     |               `boolean`               |
|    `type_isolation_mur`     |           Type d'isolation du mur           |   `enum(enveloppe:isolation:type)`    |
|    `isolation_plancher`     |  Présence d'une isolation sur le plancher   |               `boolean`               |
|  `type_isolation_plancher`  |        Type d'isolation du plancher         |   `enum(enveloppe:isolation:type)`    |
|    `type_pose_ouverture`    |         Type de pose de l'ouverture         |   `enum(enveloppe:paroi:type-pose)`   |
| `presence_retour_isolation` |      Présence d'un retour d'isolation       |               `boolean`               |
|      `largeur_dormant`      |           Largeur du dormant (mm)           |               `integer`               |
|            `kpt`            | Valeur du pont thermique linéique (W/(m·K)) |               `number`                |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §3.4
