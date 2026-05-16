## 10 Calcul de la consommation de froid (Cfr)

Les besoins et consommation en froid sont calculés pour un comportement conventionnel (consigne de refroidissement à 28°C) et pour un comportement dépensier (consigne de refroidissement à 26°C).

Quel que soit le comportement, la méthode de calcul suivante s’applique.

### 10.1 Calcul du besoin annuel de froid

Besoin annuel de refroidissement :

$$Bfr = \sum_j Bfr_j$$

Avec :

- $Bfr$ : Besoin annuel de refroidissement (kWh)
- $Bfr_j$ : Besoin de refroidissement sur le mois j (kWh)

### 10.2 Calcul du besoin mensuel de froid

Le besoin mensuel de refroidissement dépend du ratio de bilan thermique $Rbth_j$ sur le mois j :

$$Rbth_j = \frac{Ai\_fr_j + As\_fr_j}{GV * (Text_{moy\_clim\_j} - Tint) * Nref_j}$$

Avec :

- $Ai\_fr_j$ : Apports internes sur le mois j sur la période de refroidissement (Wh) - calculés au paragraphe 6.1
- $As\_fr_j$ : Apports solaires sur le mois j sur la période de refroidissement (Wh) - calculés au paragraphe 6.1
- $GV$ : Transfert thermique à travers l’enveloppe et le renouvellement d’air (W/K). Le GV prend en compte les échanges de chaleur par le renouvellement d‘air. Ces échanges sont calculés sur la période de refroidissement de la même façon que pour la période de chauffage
- $Tint$ : Température de consigne en froid (°C) égale à 28°C ou 26°C selon le comportement traité
- $Text_{moy\_clim\_j}$ : Température extérieure moyenne sur le mois j pendant les périodes de climatisation (°C)

Besoin mensuel de refroidissement $Bfr_j$ :

- Si $\frac{1}{2} > Rbth$ alors :

$$Bfr_j = 0$$

- Sinon :

$$Bfr_j = \frac{Ai\_fr_j + As\_fr_j}{1000} - fut_j * \frac{GV}{1000} * (Tint - Text_{moy\_clim\_j}) * Nref_j$$

Avec :

- $Nref_j$ : nombre d’heures de refroidissement pour le mois j, déterminé à partir des tableaux des paragraphes 18.2 et 18.3 :
  - Nref (28°C) pour une consigne de refroidissement à 28°C (comportement conventionnel)
  - Nref (26°C) pour une consigne de refroidissement à 26°C (comportement dépensier)
- $fut_j$ : facteur d'utilisation des apports sur le mois j

- Si $Rbth_j > 0$ et $Rbth_j ≠ 1$ :

$$fut_j = \frac{1 - Rbth_j^{-a}}{1 - Rbth_j^{-a-1}}$$

- Si $Rbth_j = 1$ :

$$fut_j = \frac{a}{a + 1}$$

Avec :

$$a + 1 + \frac{t}{15}$$

- $t$ : Constante de temps de la zone pour le refroidissement :

$$t = \frac{Cin}{3600 * GV}$$

- $Cin$ : Capacité thermique intérieure efficace de la zone (J/K) :

|        Inertie        |  $Cin$ (J/K)  |
| :-------------------: | :-----------: |
|        Légère         | $110000 * Sh$ |
|        Moyenne        | $165000 * Sh$ |
| Lourde ou très lourde | $260000 * Sh$ |

### 10.3 Les consommations de refroidissement

---

**Données d'entrée :**

Performance de l’installation de refroidissement (SEER ou année d’installation)

Zone climatique

Surface habitable

Surface habitable refroidie

---

La consommation de refroidissement est :

$$Cfr = 0.9 * \frac{Bfr}{EER}$$

Avec :

- 0.9 : coefficient d’intermittence pour le froid.
- $EER$ : coefficient d’efficience énergétique. Il représente la performance de l’installation de refroidissement :

$$EER = 0.95 * SEER$$

- $SEER$ : coefficient d’efficience énergétique saisonnier :

| Zone climatique | Avant 2008* | 2008-2014 | A partir de 2015 |
| :-------------: | :---------: | :-------: | :--------------: |
|  Zone H1 et H2  |     3.6     |    6.5    |       6.7        |
|     Zone H3     |    3.25     |    5.7    |       7.5        |

*EER

Si le coefficient SEER du système de refroidissement est connu et justifié, le saisir directement.

La consommation de refroidissement est déterminée pour le logement entier. Si seule une partie du logement est refroidie, alors la consommation de refroidissement du logement est obtenue en multipliant la consommation de froid calculée pour le logement entier par le rapport de la surface habitable de la partie refroidie à celle du logement.
