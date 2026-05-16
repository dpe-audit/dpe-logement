## 5 Calcul des consommations d'auxiliaires de ventilation

---
**Données d'entrée :**

- Type de VMC
- Type de bâtiment
- Surface habitable

---

La consommation annuelle d'auxiliaires de ventilation (kWhef/an) est donnée par la formule :

$$Caux = 8760 * \frac{Pvent_{moy}}{1000}$$

Avec :

- $Pvent_{moy}$ : puissance moyenne des auxiliaires (W)

**$Pvent_{moy}$ en maison individuelle :**

|   $Pvent_{moy}$   | jusqu'à 2012 | Après 2012 |
| :---------------: | :----------: | :--------: |
| Simple Flux Auto  |   65 W-ThC   |  35 W-ThC  |
| Simple Flux hygro |   50 W-ThC   |  15 W-ThC  |
|    Double Flux    |   80 W-ThC   |  35 W-ThC  |

Les puissances d'auxiliaires tabulées ci-dessus pour les VMC double flux intègrent les puissances du soufflage et de l'extraction.

**$Pvent_{moy}$ en immeuble collectif :**

$$Pvent_{moy} = Pvent * Qvarep_{conv} * Sh$$

- $Qvarep_{conv}$ : débit d'air extrait conventionnel par unité de surface habitable (m³/(h.m²)) (voir chapitre 4)
- $Sh$ : surface habitable (m2)
- $Pvent$ : puissance des auxiliaires (W/(m³/h)) :

|          $Pvent$           |   jusqu'à 2012    |       Après 2012       |
| :------------------------: | :---------------: | :--------------------: |
| Simple Flux Auto réglable  | 0.46 W-ThC/(m³/h) |   0.25 W-ThC/(m³/h)    |
| Simple Flux hygro réglable | 0.46 W-ThC/(m³/h) |   0.25 W-ThC/(m³/h)    |
| Double Flux Auto réglable  | 1.1 W-ThC/(m³/h)  | 0.6 W-ThC/(m³/h) W-ThC |

Les puissances d'auxiliaires des VMC basse pression sont les mêmes que pour les VMC classiques.

Les puissances d'auxiliaires tabulées ci-dessus pour les VMC double flux intègrent les puissances du soufflage et de l'extraction.

**Ventilation Hybride :**

On considère que le système bascule d'un mode mécanique à un mode naturel et inversement. Les consommations d'auxiliaire ont lieu pendant le mode de fonctionnement mécanique.

Par défaut la durée de fonctionnement de l'extracteur mécanique est prise pour le mode grand débit :

|            | Durée d'utilisation en grand débit (en h/semaine) |
| :--------: | :-----------------------------------------------: |
| Collectif  |                        28                         |
| Individuel |                        14                         |

Les consommations d'auxiliaires pour une VMC hybride correspondent aux consommations d'une VMC classique autoréglable de 2001 à 2012 multipliées par le ratio du temps d'utilisation :

|            | Ratio du temps d'utilisation du mode mécanique |
| :--------: | :--------------------------------------------: |
| Collectif  |                     0.167                      |
| Individuel |                     0.083                      |
