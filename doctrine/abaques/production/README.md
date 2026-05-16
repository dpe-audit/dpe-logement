# Production

## kpv.csv

Coefficient de pondération prenant en compte l'altération par rapport à l'orientation optimale.

**Schéma :**

|      Champs      |              Description              |                       Type                       |
| :--------------: | :-----------------------------------: | :----------------------------------------------: |
| `orientation_pv` | Orientation du panneau photovoltaïque | `enum(production:photovoltaique:orientation-pv)` |
| `inclinaison_pv` | Inclinaison du panneau photovoltaïque |                     `number`                     |
|      `kpv`       | Coefficient d'efficience énergétique  |                     `number`                     |

**Références réglementaires :**

- Méthode 3CL-DPE 2021 - §10.3
