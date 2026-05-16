## 16 Calcul de la consommation d'éclairage et de la production d'électricité

### 16.1 Consommation d'éclairage (Cecl)

La consommation d'éclairage est forfaitaire dans les bâtiments d'habitation. La puissance d'éclairage conventionnelle est prise égale à 1.4 W/m².

Consommation d'éclairage conventionnelle (kWh/m²) :

$$Cecl = \sum_j Cecl_j$$

$$Cecl_j = \frac{C * Pecl * Nh_j}{1000}$$

Avec :

- $C$ : coefficient correspondant au taux d'utilisation de l'éclairage en l'absence d'éclairage naturel. Il prend la valeur de 0.9 pour une commande de l'éclairage par interrupteur (considéré dans les logements).
- $Pecl$ : puissance d'éclairage conventionnelle, égale à 1,4 W/m2
- $Nh_j$ : nombre d'heures de fonctionnement de l'éclairage sur le mois j (h)

Pour chaque zone climatique, les heures de lever et de coucher du soleil sont croisées avec les heures d'occupation où l'éclairage peut être nécessaire. Il en ressort pour chaque zone climatique et pour chaque mois le nombre moyen d'heure d'éclairage journalier :

|   Mois    |  H1a  |  H1b  |  H1c  |  H2a  |  H2b  |  H2c  |  H2d  |  H3   |
| :-------: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  Janvier  |   7   |   6   |   6   |   7   |   7   |   6   |   6   |   6   |
|  Février  |   6   |   6   |   6   |   6   |   6   |   6   |   6   |   6   |
|   Mars    |   5   |   5   |   5   |   5   |   5   |   5   |   5   |   5   |
|   Avril   |   3   |   3   |   3   |   3   |   3   |   4   |   4   |   4   |
|    Mai    |   2   |   2   |   2   |   2   |   2   |   2   |   2   |   2   |
|   Juin    |   1   |   1   |   1   |   1   |   1   |   2   |   2   |   2   |
|  Juillet  |   1   |   1   |   2   |   1   |   2   |   2   |   2   |   2   |
|   Août    |   3   |   3   |   3   |   3   |   3   |   3   |   3   |   3   |
| Septembre |   4   |   4   |   4   |   4   |   4   |   5   |   5   |   4   |
|  Octobre  |   6   |   6   |   6   |   6   |   6   |   6   |   6   |   6   |
| Novembre  |   6   |   6   |   6   |   6   |   6   |   6   |   6   |   5   |
| Décembre  |   7   |   6   |   6   |   7   |   7   |   6   |   6   |   6   |

Ainsi, le nombre d'heures de fonctionnement de l'éclairage sur le mois j est :

|   Mois    |  H1a  |  H1b  |  H1c  |  H2a  |  H2b  |  H2c  |  H2d  |  H3   |
| :-------: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  Janvier  |  217  |  186  |  186  |  217  |  217  |  186  |  186  |  18   |
|  Février  |  168  |  168  |  168  |  168  |  168  |  168  |  168  |  16   |
|   Mars    |  155  |  155  |  155  |  155  |  155  |  155  |  155  |  15   |
|   Avril   |  90   |  90   |  90   |  90   |  90   |  120  |  120  |  12   |
|    Mai    |  62   |  62   |  62   |  62   |  62   |  62   |  62   |  62   |
|   Juin    |  30   |  30   |  30   |  30   |  30   |  60   |  60   |  60   |
|  Juillet  |  31   |  31   |  62   |  31   |  62   |  62   |  62   |  62   |
|   Août    |  93   |  93   |  93   |  93   |  93   |  93   |  93   |  93   |
| Septembre |  120  |  120  |  120  |  120  |  120  |  150  |  150  |  12   |
|  Octobre  |  186  |  186  |  186  |  186  |  186  |  186  |  186  |  18   |
| Novembre  |  180  |  180  |  180  |  180  |  180  |  180  |  180  |  15   |
| Décembre  |  168  |  144  |  144  |  168  |  168  |  144  |  144  |  14   |
|   Total   | 1500  | 1445  | 1476  | 1500  | 1531  | 1566  | 1566  | 1506  |

### 16.2 Production d’électricité

Seule la production d’électricité renouvelable par des capteurs photovoltaïques est prise en compte. Cependant, la présence de production d’électricité éolienne ou par cogénération devra être mentionnée.

La production d’électricité par des capteurs photovoltaïques Ppv (en kWh/m²) s’exprime de la manière suivante :

$$Ppv_j = \sum_i \frac{k_i * Scapteurs_i  * r * Epv_j * C}{Sh}$$

Avec :

- $Scapteurs_i$ : surface des panneaux photovoltaïques i orientés et inclinés de la même manière (m²)

Si la surface des panneaux n’est pas connue et ne peut être mesurée :

$$Scapteurs_i = 1.6 * Nm$$

Avec :

- 1.6 : surface par défaut d’un module photovoltaïque (m²)
- $Nm$ : nombre de modules.
- $r$ : rendement moyen des modules = 17%
- $Epv_j$ : ensoleillement en kWh/m² pour le mois j (voir partie 18.2)
- $C$ : coefficient de perte = 0,86
- $k_i$ : coefficient de pondération prenant en compte l’altération par rapport à l’orientation optimale (30° au Sud) des panneaux photovoltaïques i :

|  $k_{i}$  | ≤ 15° | 15° < ≤ 45° | 45° < ≤ 75° | > 75° |
| :-------: | :---: | :---------: | :---------: | :---: |
|    Est    |   1   |    0.96     |    0.83     | 0.59  |
|  Sud-Est  |   1   |    1.03     |    0.94     | 0.71  |
|    Sud    |   1   |    1.07     |    0.97     | 0.73  |
| Sud-Ouest |   1   |    1.03     |    0.94     | 0.71  |
|   Ouest   |   1   |    0.96     |    0.83     | 0.59  |

Dans le cas d’un appartement dans un immeuble équipé d’une installation collective de PV, la surface de capteurs à associer à l’appartement est proratisée par rapport à la surface habitable de l’immeuble.

De façon forfaitaire, une part de la production de photovoltaïque est considérée autoconsommée. Cette production d’électricité autoconsommée est déduite de la consommation d’énergie finale électrique utilisée pour le calcul des étiquettes énergie et gaz à effet de serre.

La part d’énergie photovoltaïque autoconsommée annuellement est déterminée de la façon suivante :

$$Celec\_ac = Celec\_tot * Tap$$

Avec :

- $Celec\_ac$ : électricité photovoltaïque autoconsommée (kWhef/(m².an))
- $Celec\_tot$ : consommation totale annuelle d’électricité pour les 5 usages réglementaires et les usages mobiliers (kWhef/(m².an)) (voir ci-dessous)
- $Tap$ : taux d’autoproduction, correspondant au rapport entre la production d’électricité autoconsommée et la consommation d’énergie (tous usages) du bâtiment (%) :

$$Tap = \frac{1}{\frac{1}{Tcv} + \frac{1}{Tapl}}$$

$$Tcv = \frac{Ppv}{Celec\_tot}$$

- $Tcv$ : taux de couverture, correspondant au ratio entre la production totale du site et la consommation annuelle tous usages (%)
- $Ppv$ : production totale d’électricité photovoltaïque (kWhef/(m².an))
- $Tapl$ : coefficient de calage représentant le taux d’auto-production maximum pouvant être atteint lorsque la production d’électricité renouvelable augmente :

$$Tapl = \frac{\sum_i Taplp_i * Celec\_tot_i}{Celec\_tot}$$

Avec :

$$Celec\_tot = \sum_i Celec\_tot_i$$

**Chauffage :**

$Celec\_tot\_ch$ : consommation annuelle d’électricité pour le chauffage, y compris les auxiliaires de génération (kWhef/(m².an)) :

$$Celec\_tot\_ch = Celec\_ch + Caux\_gen\_ch$$

- $Celec\_ch$ : consommation annuelle d’électricité pour le chauffage, hors la consommation des auxiliaires de génération (kWhef/(m².an))
- $Caux\_gen\_ch$ : consommation annuelle d’électricité pour les auxiliaires de génération de l’installation de chauffage (kWhef/(m².an))

**Refroidissement :**

$Celec\_tot\_ref$ : consommation annuelle d’électricité pour le refroidissement (kWhef/(m².an))

**ECS :**

$Celec\_tot\_ecs$ : consommation annuelle d’électricité pour l’ECS (kWhef/(m².an))

- $Caux\_gen\_ecs$ : consommation annuelle d’électricité pour les auxiliaires de génération de l’installation d’ECS (kWhef/(m².an))
- $Celec\_ecs$ : consommation annuelle d’électricité pour l’ECS, hors la consommation des auxiliaires de génération (kWhef/(m².an))

**Eclairage :**

$Celec\_tot\_ecl$ : Consommation annuelle d’électricité pour l’éclairage (kWhef/(m².an))

**Auxiliaires de ventilation :**

$Celec\_tot\_aux\_vent$ : consommation annuelle d’électricité pour les auxiliaires de ventilation (kWhef/(m².an))

**Auxiliaires de distribution :**

$Celec\_tot\_aux\_dist$ : consommation annuelle d’électricité pour les auxiliaires de distribution (kWhef/(m².an)) :

$$Celec\_tot\_aux\_dist = Caux\_dist\_ch + Caux\_dist\_fr 9 Caux\_dist\_ecs$$

- $Caux\_dist\_ch$ : consommation annuelle d’électricité pour les auxiliaires de distribution de l’installation de chauffage (kWhef/(m².an))
- $Caux\_dist\_fr$ : consommation annuelle d’électricité pour les auxiliaires de distribution de l’installation de refroidissement (kWhef/(m².an))
- $Caux\_dist\_ecs$ : consommation annuelle d’électricité pour les auxiliaires de distribution de l’installation d’ECS (kWhef/(m².an))

**Autres usages :**

$Celec\_tot\_au$ : consommation annuelle d’électricité pour les autres usages (kWhef/(m².an)) :

$$ Celec\_tot\_au = Ccom\_ecl + Cum$$

- $Ccom\_ecl$ : consommation annuelle d’éclairage des parties communes en logement collectif (kWhef/(m².an)) :
  - En maison individuelle : $Ccom\_ecl = 0$ kWhef/(m².an)
  - En immeuble collectif : $Ccom\_ecl = 1.1$ kWhef/(m².an)

- $Cum$ : consommation annuelle d’électricité des usages mobiliers (kWhef/(m².an))
  - En maison individuelle : $Cum = 29$ kWhef/(m².an)
  - En immeuble collectif : $Cum = 27$ kWhef/(m².an)

**$Taplp_i$ : valeur d’autoproduction partielle pour l'usage de l'électricité i :**

|  Usage de l'électricité i   | $Taplp_i$ |
| :-------------------------: | :-------: |
|          Chauffage          |   0.02    |
|       Refroidissement       |   0.25    |
|             ECS             |   0.05    |
|          Eclairage          |   0.05    |
| Auxiliaires de ventilation  |   0.50    |
| Auxiliaires de distribution |   0.10    |
|        Autres usages        |   0.45    |

Si un usage n’est pas électrique : $Taplp_i = 0$

L’électricité « autoconsommée » $Celec\_ac$ est répartie conventionnellement par usage de l'électricité i au prorata des valeurs $Taplp_i$ et $Celec\_tot_i$ :

$$Celec\_ac_i = Celec\_ac * \frac{Talp_i * Celec\_tot_i}{Tapl * Celec\_tot}$$

$Celec\_ac_i$ : électricité autoconsommée pour l’usage de l’électricité i (kWhef/(m².an))
