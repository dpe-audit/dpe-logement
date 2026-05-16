## 6 Détermination des apports gratuits

### 6.1 Calcul de F

---

**Données d'entrée :**

- Département
- Altitude

---

$F_j$ est la fraction des besoins de chauffage du mois j couverts par les apports gratuits, elle s'exprime en fonction de l'inertie du bâtiment :

|       Inertie        |               $F_j$               |
| :------------------: | :-------------------------------: |
| Lourde / Très Lourde | $(X_j - X_j^3.6) / (1 - X_j^3.6)$ |
|       Moyenne        | $(X_j - X_j^2.9) / (1 - X_j^2.9)$ |
|        Légère        | $(X_j - X_j^2.5) / (1 - X_j^2.5)$ |

Avec :

$$X_j = \frac{As_j + Ai_j}{GV \times DH_j}$$

- $GV$ : déperditions de l'enveloppe en W/K (calculées dans la partie 3)
- $DH_j$ : degrés-heures de chauffage sur le mois j (°Ch), déterminés à partir des tableaux des paragraphes 18.2 et 18.3 :
  - DH19 pour une consigne de chauffage à 19°C (comportement conventionnel)
  - DH21 pour une consigne de chauffage à 21°C (comportement dépensier)

- $Ai_j$ : apports internes dans le logement sur le mois j (Wh) :

Les apports internes de chaleur dus aux équipements prennent en compte l'ensemble des équipements « mobiliers » (cuisson, audiovisuel, informatique, lavage, froid, appareils ménagers). Pour distinguer le fonctionnement permanent du fonctionnement lié à l'occupation, on considère que la puissance de chaleur dégagée par l'ensemble des équipements est conventionnellement de :

- 5.7 W/m² en occupation hors période de sommeil
- 1.1 W/m² en inoccupation et pendant le sommeil

Le scénario conventionnel d'occupation hebdomadaire des logements est le suivant :

- De 0h à 9h et de 17h à 24h avec une période de sommeil allant de 0h et de 6h et de 22h à 24h les lundi, mardi, jeudi et vendredi
- De 0h à 9h et de 13h à 24h avec une période de sommeil allant de 0h à 6h et de 22h à 24h le mercredi
- De 0h à 24h les samedi et dimanche avec une période de sommeil allant de 0h à 6h et de 22h à 24h

Soit sur une semaine :

- 132h d'occupation dont 56h de sommeil
- 36h d'inoccupation

Les apports internes moyens dus aux équipements sur une semaine type sont donc de 3.18 W/m².

À ces apports il faut ajouter :

- Ceux de l'éclairage, qui correspondent à une puissance moyenne de 1.4 W/m² en fonctionnement. Les apports d'éclairage sont des moyennes annuelles sur toutes les zones climatiques. Cette valeur est pondérée par le nombre d'heures moyen d'éclairage (voir paragraphe 16.1) sur l'année c'est-à-dire 2123 h sur 8760 h.

Les apports moyens annuels d'éclairage correspondent donc à $1.4 × (2123 / 8760) = 0.34$ W/m².

- Ceux dus aux occupants : on considère un apport de chaleur de 90 W par adulte équivalent (variable $Nadeq$ déterminée au paragraphe 11.1). Le nombre d'adultes équivalent est calculé en fonction de la surface habitable. Les apports de chaleur dus aux occupants sont donc à $90 × Nadeq × (132 / (7 × 24))$.

**En période de chauffe :**

Les apports internes sur le mois j (en Wh) en période de chauffe sont donc :

$$Ai_j = \left[(3.18 + 0.34) \times Sh + 90 \times \frac{132}{168} \times Nadeq\right] \times Nref_j$$

- $Sh$ : surface habitable du logement (m²)
- $Nadeq$ : nombre d'adultes équivalent (voir paragraphe 11.1)
- $Nref_j$ : nombre d'heures de chauffage pour le mois j, déterminé à partir des tableaux des paragraphes 18.2 et 18.3 :
  - Nref (19°C) pour une consigne de chauffage à 19°C (comportement conventionnel)
  - Nref (21°C) pour une consigne de chauffage à 21°C (comportement dépensier)

Pour une année complète, $Nref$ est évalué seulement sur la saison de chauffe avec :

$$Nref = \sum_j Nref_j$$

- $As_j$ : apports solaires sur le mois j durant la période de chauffe (Wh) :

$$As_j = 1000 \times Sse_j \times E_j$$

En présence d'une véranda ou autre espace solarisé non chauffé, à ces apports solaires s'ajoutent ceux à travers cet espace. Le calcul des apports solaires à travers un espace solarisé non chauffé est détaillé au paragraphe 6.3.

- $Sse_j$ : « Surface transparente sud équivalente » du logement, c'est-à-dire la surface de paroi, fictive, exposée au sud, totalement transparente et sans ombrage, qui provoquerait les mêmes apports solaires que les parois du logement, pour le mois j (m²) (voir partie 6.2)
- $E_j$ : ensoleillement reçu, sur le mois j, par une paroi verticale orientée au sud en absence d'ombrage (kWh/m²)

**En période de refroidissement :**

De la même manière, les apports internes sur le mois j (en Wh) en période de refroidissement sont donc :

$$Ai\_fr_j = \left[(3.18 + 0.34) \times S_h + 90 \times \frac{132}{168} \times Nadeq\right] \times Nref_j$$

Avec :

- $Nref_j$ : nombre d'heures de chauffage pour le mois j, déterminé à partir des tableaux des paragraphes 18.2 et 18.3 :
  - Nref (28°C) pour une consigne de refroidissement à 28°C (comportement conventionnel)
  - Nref (26°C) pour une consigne de refroidissement à 26°C (comportement dépensier)

Pour une année complète, Nref est évalué seulement sur la saison de refroidissement avec :

$$Nref = \sum_j Nref_j$$

Les apports solaires sur le mois j As_frj (en Wh) durant la période de refroidissement sont :

$$As\_fr_j = 1000 \times Sse_j \times E\_fr_j$$

Avec :

- $E\_fr_j$ : ensoleillement reçu en période de refroidissement, sur le mois j, par une paroi verticale orientée au sud en absence d'ombrage (kWh/m²), déterminé à partir des tableaux des paragraphes 18.2 et 18.3 :
  - E_frj (19°C) pour une consigne de chauffage à 19°C (comportement conventionnel)
  - E_frj (21°C) pour une consigne de chauffage à 21°C (comportement dépensier)
- $Sse_j$ : « Surface transparente sud équivalente » du logement pour le mois j (m²)

### 6.2 Détermination de la surface Sud équivalente

---
**Données d'entrée :**

- Inclinaison des baies (verticale, pente, horizontale)
- Orientation des baies (Nord, Sud, Est, Ouest)
- Position des baies en flanc de loggias
- Nature des menuiseries (bois, PVC…)
- Type de vitrage (Simple, double…)
- Positionnement de la menuiserie (tunnel, nu intérieur…)
- Type de masque
- Masques proches (balcon, loggias…)
- Masques lointains
- Profondeur des masques proches (profondeur balcon)
- Largeur des baies
- Positionnement des masques (Nord, Sud…)
- Angle de vue des masques lointains
- Type de fenêtre ou de porte fenêtre (coulissante, battante, avec ou sans soubassement…)

---

La prise en compte des apports solaires exige à minima une saisie par façade des fenêtres du bâtiment. Le calcul de la surface sud équivalente se fait en sommant les valeurs de Sse pour chaque paroi vitrée i :

$$Sse_j = \sum_i A_i \times Sw_i \times Fe_i \times C1_{i,j}$$

Avec :

- $A_i$ : surface de la baie i (m²)
- $Sw_i$ : proportion d'énergie solaire incidente qui pénètre dans le logement par la paroi vitrée i
- $Fe_i$ : facteur d'ensoleillement, qui traduit la réduction d'énergie solaire reçue par une paroi vitrée du fait des masques
- $C1_{i,j}$ : coefficient d'orientation et d'inclinaison pour la paroi vitrée i pour le mois j, voir paragraphe 18.5

La surface vitrée des portes n'est pas prise en compte dans le calcul de $Sse_j$.

#### 6.2.1 Détermination du facteur solaire

La proportion d'énergie solaire incidente qui pénètre dans le logement à travers une paroi est donnée par :

- Pour les parois en polycarbonate : Sw = 0.4
- Pour les parois en brique de verre pleine ou creuse : Sw = 0.4
- Pour les doubles-fenêtres composées de deux fenêtres de facteur solaire Sw1 et Sw2, le facteur solaire de la double-fenêtre est : Sw = Sw1 × Sw2
- Dans le cas d'un survitrage, on prendra en compte le Sw du double vitrage équivalent.

Si les facteurs solaires des menuiseries sont connus et justifiés, les saisir directement. Sinon, les tableaux suivants donnent des valeurs par défaut des facteurs solaires en fonction des caractéristiques des menuiseries :

**Sw — Fenêtre ou porte-fenêtre au nu extérieur :**

|              Menuiserie              |                     Type de fenêtre                     | Simple vitrage | Double vitrage | Double vitrage VIR | Triple vitrage | Triple vitrage VIR |
| :----------------------------------: | :-----------------------------------------------------: | :------------: | -------------: | :----------------- | :------------- | -----------------: |
|          Bois / Bois-métal           |                    Fenêtre battante                     |      0.58      |           0.52 | 0.45               | 0.46           |               0.41 |
|          Bois / Bois-métal           |                   Fenêtre coulissante                   |      0.58      |           0.52 | 0.45               | 0.46           |               0.41 |
|          Bois / Bois-métal           | Porte-fenêtre battante ou coulissante sans soubassement |      0.62      |           0.55 | 0.48               | 0.49           |               0.44 |
|          Bois / Bois-métal           |        Porte-fenêtre battante avec soubassement         |      0.53      |           0.48 | 0.41               | 0.42           |               0.38 |
|                 PVC                  |                    Fenêtre battante                     |      0.54      |           0.48 | 0.42               | 0.43           |               0.39 |
|                 PVC                  |        Porte-fenêtre battante sans soubassement         |      0.57      |           0.51 | 0.44               | 0.45           |               0.40 |
|                 PVC                  |        Porte-fenêtre battante avec soubassement         |      0.50      |           0.45 | 0.39               | 0.40           |               0.36 |
|                 PVC                  |                   Fenêtre coulissante                   |      0.60      |           0.54 | 0.46               | 0.47           |               0.43 |
|                 PVC                  |                Porte-fenêtre coulissante                |      0.64      |           0.57 | 0.49               | 0.51           |               0.45 |
| Métal avec rupture de pont thermique |                    Fenêtre battante                     |      0.59      |           0.53 | 0.46               | 0.47           |               0.42 |
| Métal avec rupture de pont thermique |                 Porte-fenêtre battante                  |      0.63      |           0.56 | 0.48               | 0.50           |               0.45 |
| Métal avec rupture de pont thermique |                   Fenêtre coulissante                   |      0.65      |           0.58 | 0.50               | 0.52           |               0.46 |
| Métal avec rupture de pont thermique |                Porte-fenêtre coulissante                |      0.70      |           0.62 | 0.54               | 0.55           |               0.50 |
|                Métal                 |                    Fenêtre battante                     |      0.61      |           0.55 | 0.48               | 0.49           |               0.44 |
|                Métal                 |                 Porte-fenêtre battante                  |      0.64      |           0.58 | 0.50               | 0.52           |               0.47 |
|                Métal                 |                   Fenêtre coulissante                   |      0.67      |           0.60 | 0.52               | 0.53           |               0.48 |
|                Métal                 |                Porte-fenêtre coulissante                |      0.71      |           0.64 | 0.55               | 0.56           |               0.51 |

**Sw — Fenêtre ou porte-fenêtre au nu intérieur ou en tunnel :**

|              Menuiserie              |                     Type de fenêtre                     | Simple vitrage | Double vitrage | Double vitrage VIR | Triple vitrage | Triple vitrage VIR |
| :----------------------------------: | :-----------------------------------------------------: | :------------: | -------------: | :----------------- | :------------- | -----------------: |
|          Bois / Bois-métal           |                    Fenêtre battante                     |      0.52      |           0.47 | 0.40               | 0.41           |               0.37 |
|          Bois / Bois-métal           |                   Fenêtre coulissante                   |      0.52      |           0.47 | 0.40               | 0.41           |               0.37 |
|          Bois / Bois-métal           | Porte-fenêtre battante ou coulissante sans soubassement |      0.56      |           0.50 | 0.43               | 0.44           |               0.40 |
|          Bois / Bois-métal           |        Porte-fenêtre battante avec soubassement         |      0.48      |           0.43 | 0.37               | 0.38           |               0.34 |
|                 PVC                  |                    Fenêtre battante                     |      0.49      |           0.44 | 0.38               | 0.39           |               0.35 |
|                 PVC                  |        Porte-fenêtre battante sans soubassement         |      0.51      |           0.46 | 0.39               | 0.40           |               0.36 |
|                 PVC                  |        Porte-fenêtre battante avec soubassement         |      0.45      |           0.40 | 0.35               | 0.36           |               0.32 |
|                 PVC                  |                   Fenêtre coulissante                   |      0.54      |           0.48 | 0.41               | 0.43           |               0.38 |
|                 PVC                  |                Porte-fenêtre coulissante                |      0.57      |           0.51 | 0.44               | 0.45           |               0.41 |
| Métal avec rupture de pont thermique |                    Fenêtre battante                     |      0.53      |           0.48 | 0.41               | 0.42           |               0.38 |
| Métal avec rupture de pont thermique |                 Porte-fenêtre battante                  |      0.56      |           0.51 | 0.44               | 0.45           |               0.40 |
| Métal avec rupture de pont thermique |                   Fenêtre coulissante                   |      0.58      |           0.52 | 0.45               | 0.46           |               0.42 |
| Métal avec rupture de pont thermique |                Porte-fenêtre coulissante                |      0.63      |           0.56 | 0.48               | 0.50           |               0.45 |
|                Métal                 |                    Fenêtre battante                     |      0.55      |           0.49 | 0.43               | 0.44           |               0.40 |
|                Métal                 |                 Porte-fenêtre battante                  |      0.58      |           0.52 | 0.45               | 0.46           |               0.42 |
|                Métal                 |                   Fenêtre coulissante                   |      0.60      |           0.54 | 0.47               | 0.48           |               0.43 |
|                Métal                 |                Porte-fenêtre coulissante                |      0.64      |           0.57 | 0.49               | 0.51           |               0.46 |

#### 6.2.2 Détermination du facteur d'ensoleillement

On considère successivement les obstacles liés au bâtiment (balcons, loggias, avancées, ...) et les obstacles liés à l'environnement (autres bâtiments, reliefs, végétation, ...). On obtient ainsi deux coefficients, Fe1 et Fe2, dont on fait le produit, soit :

$$Fe = Fe1 \times Fe2$$

En l'absence d'obstacles liés au bâtiment et pour les configurations non présentées ci-dessous, $Fe1 = 1$ ;

En l'absence d'obstacles liés à l'environnement, $Fe2 = 1$ ;

Conventionnellement, les orientations Nord, Sud, Est et Ouest correspondent aux secteurs situés de part et d'autre de ces orientations dans un angle de 45°. Pour respectivement le Nord et le Sud, les orientations incluent les limites Nord-Est, Nord-Ouest et Sud-Est, Sud-Ouest.

##### 6.2.2.1 Masques proches

##### 6.2.2.1.1 Baie en fond de balcon ou fond et flanc de loggias

Le tableau ci-dessous donne les valeurs de $Fe1$ en fonction de l'orientation de la façade et de l'avancée I de la loggia ou du balcon :

| Avancée l (m) | Nord  |  Sud  | Est ou Ouest |
| :-----------: | :---: | :---: | :----------: |
|      < 1      |  0.4  |  0.5  |     0.45     |
|   1 ≤ … < 2   |  0.3  |  0.4  |     0.35     |
|   2 ≤ … < 3   |  0.2  |  0.3  |     0.25     |
|      3 ≤      |  0.1  |  0.2  |     0.15     |

L'orientation Nord va du Nord-Est au Nord-Ouest bornes comprises.

L'orientation Sud va du Sud-Est au Sud-Ouest bornes comprises.

L'orientation Est va du Nord-Est au Sud-Est bornes exclues.

L'orientation Ouest va du Nord-Ouest au Sud-Ouest bornes exclues.

##### 6.2.2.1.2 Baie sous un balcon ou auvent

Le tableau ci-dessous donne les valeurs de $Fe1$ quelle que soit l'orientation de la façade en fonction de l'avancée I :

| Avancée l (m) | $Fe1$ |
| :-----------: | :---: |
|      < 1      |  0.8  |
|   1 ≤ … < 2   |  0.6  |
|   2 ≤ … < 3   |  0.5  |
|      ≥ 3      |  0.4  |

##### 6.2.2.1.3 Baie masquée par une paroi latérale

Une paroi latérale est considérée faire obstacle si les angles β et γ sont supérieurs à 30°. Les angles sont pris au centre des baies.

Le tableau ci-dessous donne les valeurs de Fe1 selon la position de l'obstacle latéral :

|    Position de l'obstacle latéral     | $Fe1$ |
| :-----------------------------------: | :---: |
| Le retour ne fait pas obstacle au Sud |  0.7  |
|    Le retour fait obstacle au Sud     |  0.5  |

Attention : en présence de plusieurs types de masques proches, seul l'impact du masque le plus pénalisant est pris en compte.

##### 6.2.2.2 Masques lointains

##### 6.2.2.2.1 Obstacle d'environnement homogène

Les masques lointains s'appliquent à toute une façade. Les angles sont mesurés à partir du centre de la façade.

Le tableau ci-dessous donne les valeurs de $Fe2$ selon la hauteur du masque et l'orientation de la façade :

| Hauteur α (°) | Sud | Est ou Ouest | Nord |
| ------------- | --- | ------------ | ---- |
| < 15          | 1   | 1            | 1    |
| 15 ≤ … < 30   | 0.8 | 0.77         | 0.82 |
| 30 ≤ … < 60   | 0.3 | 0.4          | 0.5  |
| 60 ≤ … < 90   | 0.1 | 0.2          | 0.3  |

##### 6.2.2.2.2 Obstacle d'environnement non homogène

$$Fe2 = 1 - \sum \frac{Omb}{100}$$

Avec :

- $Omb$ : l'ombrage créé par l'obstacle sur la paroi

La méthode d'évaluation est la suivante :

1. on découpe le champ de vision en quatre secteurs égaux ;
2. on détermine, pour chacun d'eux, la hauteur moyenne des obstacles ;
3. on lit dans le tableau ci-dessous les valeurs correspondantes de l'ombrage, Omb :

**Façade au Sud ou au Nord :**

| Hauteur moyenne de l'obstacle α, β (°) | Pour les 2 secteurs latéraux | Pour les 2 secteurs centraux |
| :------------------------------------: | :--------------------------: | :--------------------------: |
|                  < 15                  |              0               |              0               |
|              15 ≤ … < 30               |              4               |              14              |
|              30 ≤ … < 60               |              13              |              35              |
|              60 ≤ … < 90               |              15              |              40              |

**Façade à l'Est ou à l'Ouest :**

| Hauteur moyenne de l'obstacle α, β (°) | Pour le secteur latéral vers le sud | Pour le secteur central vers le sud | Pour les 2 autres secteurs |
| :------------------------------------: | :---------------------------------: | :---------------------------------: | :------------------------: |
|                  < 15                  |                  0                  |                  0                  |             0              |
|              15 ≤ … < 30               |                 14                  |                 17                  |             5              |
|              30 ≤ … < 60               |                 27                  |                 40                  |             17             |
|              60 ≤ … < 90               |                 30                  |                 45                  |             25             |

Les masques lointains sont évalués au niveau de la baie la plus proche du centre de la façade avant de s'appliquer à toutes les baies de cette façade.

### 6.3 Traitement des espaces tampons solarisés

Un logement donnant sur un espace tampon solarisé (véranda, loggia fermée) est influencé dans son bilan énergétique par les apports solaires. Il en existe deux types :

- Les apports solaires indirects qui sont associés au rayonnement solaire qui rentre dans le logement après de multiples réflexions dans l'espace tampon solarisé ;
- Les apports solaires directs qui sont associés au rayonnement solaire qui rentre directement dans le logement après avoir traversé l'espace tampon solarisé pour pénétrer dans le logement (en direct ou diffus).

Les apports solaires à travers un espace tampon solarisé sont donnés sur un mois j par :

$$As\_ver_j = 1000 \times Sse\_veranda_j \times E_j$$

Avec :

- $E_j$ : ensoleillement reçu par une paroi verticale orientée au sud en l'absence d'ombrage sur le mois j (kWh/m²), déterminé à partir des tableaux des paragraphes 18.2 et 18.3

Dans le cas de baies vitrées séparant l'espace tampon solarisé de la partie habitable du logement, l'impact de l'espace tampon solarisé sur les apports solaires à travers ces baies vitrées est modélisé par une surface sud équivalente pour le mois j $Sse\_veranda_j$ :

$$Sse\_veranda_j = Ssd_j + Ssind_j \times bver$$

- $Ssd$ : Surface sud équivalente représentant l'impact des apports solaires associés au rayonnement solaire traversant directement l'espace tampon pour arriver dans la partie habitable du logement (apports directs) :

$$Ssd_j = T \times \sum_i A_i \times Sw_i \times Fe_i \times C1_{i,j}$$

Avec :

- $A_i$ : Surface de la baie i séparant le logement de l'espace tampon solarisé (m²)
- $Sw_i$ : Facteur solaire de la baie i séparant le logement de l'espace tampon solarisé
- $Fe_i$ : Facteur d'ensoleillement, qui traduit la réduction d'énergie solaire reçue par la baie i du fait des masques (la présence de l'espace tampon solarisé n'est pas prise en compte pour déterminer ce coefficient)
- $C1_{i,j}$ : Coefficient d'orientation et d'inclinaison de la baie i séparant le logement de l'espace tampon solarisé pour le mois j, voir paragraphe 18.5
- $T$ : Coefficient représentant la transparence de l'espace tampon solarisé. Il correspond à l'atténuation du rayonnement solaire arrivant directement dans le logement par la traversée de l'espace tampon solarisé. Il prend les valeurs du tableau suivant selon les caractéristiques des parois vitrées de l'espace tampon solarisé :

|              Menuiserie              |      Type de Vitrage       | Transparence $T$ |
| :----------------------------------: | :------------------------: | :--------------: |
|          Bois / Bois métal           |       Simple vitrage       |       0.62       |
|          Bois / Bois métal           |       Double vitrage       |       0.55       |
|          Bois / Bois métal           | Double vitrage peu émissif |       0.48       |
|          Bois / Bois métal           |       Triple vitrage       |       0.49       |
|          Bois / Bois métal           | Triple vitrage peu émissif |       0.44       |
|                 PVC                  |       Simple vitrage       |       0.5        |
|                 PVC                  |       Double vitrage       |       0.45       |
|                 PVC                  | Double vitrage peu émissif |       0.39       |
|                 PVC                  |       Triple vitrage       |       0.4        |
|                 PVC                  | Triple vitrage peu émissif |       0.36       |
| Métal avec rupture de pont thermique |       Simple vitrage       |       0.63       |
| Métal avec rupture de pont thermique |       Double vitrage       |       0.56       |
| Métal avec rupture de pont thermique | Double vitrage peu émissif |       0.48       |
| Métal avec rupture de pont thermique |       Triple vitrage       |       0.5        |
| Métal avec rupture de pont thermique | Triple vitrage peu émissif |       0.45       |
|                Métal                 |       Simple vitrage       |       0.64       |
|                Métal                 |       Double vitrage       |       0.58       |
|                Métal                 | Double vitrage peu émissif |       0.5        |
|                Métal                 |       Triple vitrage       |       0.52       |
|                Métal                 | Triple vitrage peu émissif |       0.47       |

Pour les parois en polycarbonate, on prendra $T = 0.4$.

Dans le cas où les vitrages séparant l'espace tampon solarisé de l'extérieur sont hétérogènes, le coefficient $T$ est celui du vitrage majoritaire. Dans le cas où aucun vitrage n'est majoritaire, le coefficient $T$ est proratisé à la surface.

- $bver$ : Coefficient de réduction des déperditions (voir partie 3.1)
- $Ssind_j$ : Surface sud équivalente représentant l'impact des apports solaires associés au rayonnement solaire entrant dans la partie habitable du logement après de multiples réflexions dans l'espace tampon solarisé (apports indirects) pour le mois j.

La surface sud équivalente représentant les apports solaires indirects dans le logement pour le mois j Ssindj, correspond à la surface sud équivalente des apports totaux dans la véranda Sstj, à laquelle il faut déduire celle des apports directs Ssdj :

$$Ssind_j = Sst_j - Ssd_j$$

$$Sst_j = \sum_k A_k \times (0.8 \times T + 0.024) \times Fe_k \times C1_{k,j}$$

Avec :

- $A_k$ : Surface de la baie k séparant la véranda de l'extérieur (m²)
- $T$ : Coefficient de transparence des baies séparant la véranda de l'extérieur (m²)
- $Fe_k$ : Facteur d'ensoleillement, qui traduit la réduction d'énergie solaire reçue par la baie k du fait des masques lointains. Pour les espaces tampons solarisés, Fek = 1 car l'impact des masques sera négligé.
- $C1_{k,j}$ : Coefficient d'orientation et d'inclinaison de la baie k séparant la véranda de l'extérieur pour le mois j, voir paragraphe 18.5

Les grandes surfaces vitrées séparant la véranda de l'extérieur seront traitées comme des portes-fenêtres avec des menuiseries au nu extérieur.
