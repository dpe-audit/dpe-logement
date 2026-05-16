## 3 Calcul des déperditions de l'enveloppe GV

---

**Données d'entrée :**

- Caractéristiques de l'enveloppe (linéaires, surfaces, U)
- Surface des parois déperditives i (murs, plafonds, planchers, baies, portes)
- Linéaires de ponts thermiques

---

La somme GV des déperditions par les parois et par renouvellement d'air (W/K) s'exprime de la manière suivante :

$$GV = DP_{mur} + DP_{plancher\_bas} + DP_{plancher\_haut} + DP_{menuiserie} + PT + DR$$

Avec :

- $PT$* : déperditions par les ponts thermiques (W/K) (voir partie 3.4)
- $DR$ : déperditions par le renouvellement d'air (W/K) (voir partie 4)
- $DP\_paroi$ : déperdition par la paroi (W/K) :

$$DP_{mur} = \sum_i b_i \times S_{muri} \times U_{muri}$$

$$DP_{plancher\_bas} = \sum_i b_i \times S_{pbi} \times U_{pbi}$$

$$DP_{plancher\_haut} = \sum_i b_i \times S_{phi} \times U_{phi}$$

$$DP_{menuiserie} = \sum_i b_i \times S_{menuiseriei} \times U_{menuiseriei}$$

Avec :

- $b_i$ : coefficient de réduction des déperditions pour la paroi i (voir partie 3.1)
- $S\_paroi_i$ : surface de la paroi déperditive i (m²)
- $U\_paroi_i$ : coefficient de transmission thermique de la paroi i (W/(m².K)) (voir parties 3.2 et 3.3)

On appelle menuiserie l'ensemble vitrage-protection solaire des fenêtres, portes-fenêtres et portes.

Attention : Les parois donnant sur un bâtiment autre que d'habitation sont aussi considérées déperditives.

La surface prise en compte pour l'établissement du DPE est la surface habitable du bâtiment. Cette surface intègre les vérandas chauffées.

En présence d'un espace non habitable chauffé (par exemple un garage ou un sous-sol), cet espace est traité dans le DPE comme un espace non chauffé. Dans ce cas, le diagnostiqueur devra obligatoirement mentionner dans le rapport que cet espace ne doit pas être chauffé et intégrer ce commentaire dans la justification des écarts entre les factures et les consommations conventionnelles.

---

### 3.1 Détermination du coefficient de réduction des déperditions b

---

**Données d'entrée :**

- Surface des parois séparant le local non chauffé des locaux chauffés : Aiu (m²)
- Surface des parois séparant le local non chauffé de l'extérieur ou du sol : Aue (m²)
- Type de local non chauffé (garage, comble, circulation…)
- État d'isolation des parois du local non chauffé (isolées, non isolées)

---

Pour une paroi enterrée ou donnant sur l'extérieur, ou un plancher sur terre-plein, vide sanitaire ou sous-sol non chauffé, $b = 1$.

Dans le cas de locaux non chauffés non accessibles (mitoyenneté, espace sans accès…), forfaitairement $b = 0.95$.

Les parois donnant sur un bâtiment ou un espace autre que d'habitation (occupation discontinue) sont considérées comme déperditives avec $b = 0.2$.

Pour les circulations communes au niveau d'un appartement en bâtiment collectif d'habitation, le calcul de b se fait en considérant les parois situées au même niveau que le lot traité. Pour un calcul fait à l'immeuble, un seul b est pris pour toutes les circulations communes si elles ne sont pas en volume intérieur chauffé.

La méthode de caractérisation des espaces communs en volume chauffé ou non chauffé est détaillée au §17.1.1.3.

Une paroi donnant sur un volume non intérieur ou sur un volume intérieur non chauffé sera considérée comme déperditive. Le b sera déterminé à l'aide de la méthode suivante.

Dans les autres cas, b est déterminé à l'aide des tableaux suivants, en fonction du rapport des surfaces Aiu/Aue et du coefficient surfacique équivalent UV,ue :

- $Aue$ est la surface des parois du local non chauffé donnant sur l'extérieur ou en contact avec le sol (paroi enterrée, terre-plein)
- $Aiu$ est la surface des parois du local non chauffé qui donnent sur des locaux chauffés

Il est considéré qu'il n'y a pas d'échange entre deux locaux non chauffés distincts (sans liaison aéraulique). La surface des parois du local non chauffé donnant sur un vide sanitaire ou un autre local non chauffé n'entre donc ni dans Aiu ni dans Aue.

Le coefficient surfacique équivalent $UV,ue$ est déterminé via le tableau ci-dessous :

|                             Locaux non chauffés types                              | $UV,ue$ W/(m².K) |
| :--------------------------------------------------------------------------------: | :--------------: |
|                              **Maison individuelle**                               |                  |
|                                       Garage                                       |        3         |
|                                      Cellier                                       |        3         |
|                             Comble — fortement ventilé                             |        9         |
|                            Comble — faiblement ventilé                             |        3         |
|                          Comble — très faiblement ventilé                          |       0.3        |
|                               **Logement collectif**                               |                  |
|           Circulations communes — sans ouverture directe sur l'extérieur           |       0.0        |
|           Circulations communes — avec ouverture directe sur l'extérieur           |       0.3        |
| Circulations communes — avec bouche ou gaine de désenfumage, ouverte en permanence |        3         |
|                       Circulations communes — halls d'entrée                       | 3^(1) ou 0.3^(2) |
|                   Circulations communes — garage privé collectif                   |        3         |
|                                 Autres dépendances                                 |        3         |
|                             Comble — fortement ventilé                             |        9         |
|                            Comble — faiblement ventilé                             |        3         |
|                          Comble — très faiblement ventilé                          |       0.3        |

*(1) Portes d'accès sans dispositif de fermeture automatique*
*(2) Portes d'accès avec dispositif de fermeture automatique*

L'identification du niveau de ventilation des combles peut s'appuyer sur les définitions ci-dessous. Cependant, la présence d'ouvertures dans les parois des combles doit aussi être prise en compte pour déterminer leur niveau de ventilation :

- Combles fortement ventilés : combles couverts en tuiles ou autres éléments de couverture discontinus, sans support continu ;
- Combles faiblement ventilés : combles couverts avec éléments de couverture continus sur support discontinu, ou avec éléments de couverture discontinus sur support continu ;
- Combles très faiblement ventilés : combles couverts avec éléments de couverture continus sur support continu.

Dans le cas où $Aue = 0$, alors $b = 0$.

Dans les tableaux suivants :

- lnc désigne un local non chauffé ;
- lc désigne le local chauffé.

Les parois du local non chauffé sont considérées comme isolées si plus de 50% de leur surface est isolée.

Les parois en double vitrage et les portes seront considérées comme non isolées pour le calcul de b. Les parois en triple vitrage seront considérées isolées.

Les parois déperditives dont l'état d'isolation n'est pas connu sont considérées :

- Pour les bâtiments d'avant 1975, la paroi est considérée comme non isolée ;
- Pour les bâtiments construits à partir de 1975 :
  - Les murs sont considérés comme isolés par l'intérieur ;
  - Les plafonds sont considérés isolés par l'extérieur ;
  - Les planchers sur terre-plein sont considérés isolés par l'extérieur (en sous face) à partir de 2001.

On en déduit la valeur de b en fonction des différents cas suivants :

**Cas 1 : $Aue$ non isolée / $Aiu$ isolée :**

|    $Aiu/Aue$    | $UV,ue = 0.0$ | $UV,ue = 0.3$ | $UV,ue = 3.0$ | $UV,ue = 9.0$ |
| :-------------: | :-----------: | :-----------: | :-----------: | :-----------: |
|     ≤ 0.25      |     0.95      |     0.95      |     1.00      |     1.00      |
|  0.25 < ≤ 0.50  |     0.95      |     0.95      |     0.95      |     1.00      |
|  0.50 < ≤ 0.75  |     0.90      |     0.95      |     0.95      |     1.00      |
|  0.75 < ≤ 1.00  |     0.85      |     0.90      |     0.95      |     0.95      |
|  1.00 < ≤ 1.25  |     0.85      |     0.90      |     0.90      |     0.95      |
|  1.25 < ≤ 2.00  |     0.80      |     0.80      |     0.90      |     0.95      |
|  2.00 < ≤ 2.50  |     0.75      |     0.80      |     0.85      |     0.90      |
|  2.50 < ≤ 3.00  |     0.70      |     0.75      |     0.85      |     0.90      |
|  3.00 < ≤ 3.50  |     0.65      |     0.75      |     0.80      |     0.90      |
|  3.50 < ≤ 4.00  |     0.65      |     0.70      |     0.80      |     0.90      |
|  4.00 < ≤ 6.00  |     0.55      |     0.60      |     0.70      |     0.85      |
|  6.00 < ≤ 8.00  |     0.45      |     0.55      |     0.65      |     0.80      |
| 8.00 < ≤ 10.00  |     0.40      |     0.50      |     0.60      |     0.75      |
| 10.00 < ≤ 25.00 |     0.35      |     0.40      |     0.50      |     0.70      |
| 25.00 < ≤ 50.00 |     0.20      |     0.25      |     0.35      |     0.50      |
|     50.00 <     |     0.10      |     0.15      |     0.20      |     0.30      |

**Cas 2 : $Aiu$ non isolée / $Aue$ non isolée :**

|    $Aiu/Aue$    | $UV,ue = 0.0$ | $UV,ue = 0.3$ | $UV,ue = 3.0$ | $UV,ue = 9.0$ |
| :-------------: | :-----------: | :-----------: | :-----------: | :-----------: |
|     ≤ 0.25      |     0.80      |     0.85      |     0.90      |     0.95      |
|  0.25 < ≤ 0.50  |     0.65      |     0.75      |     0.80      |     0.90      |
|  0.50 < ≤ 0.75  |     0.55      |     0.65      |     0.75      |     0.85      |
|  0.75 < ≤ 1.00  |     0.50      |     0.55      |     0.70      |     0.80      |
|  1.00 < ≤ 1.25  |     0.45      |     0.50      |     0.65      |     0.80      |
|  1.25 < ≤ 2.00  |     0.35      |     0.40      |     0.50      |     0.70      |
|  2.00 < ≤ 2.50  |     0.30      |     0.35      |     0.45      |     0.65      |
|  2.50 < ≤ 3.00  |     0.25      |     0.30      |     0.40      |     0.60      |
|  3.00 < ≤ 3.50  |     0.20      |     0.30      |     0.40      |     0.55      |
|  3.50 < ≤ 4.00  |     0.20      |     0.25      |     0.35      |     0.50      |
|  4.00 < ≤ 6.00  |     0.15      |     0.20      |     0.25      |     0.40      |
|  6.00 < ≤ 8.00  |     0.10      |     0.15      |     0.20      |     0.35      |
| 8.00 < ≤ 10.00  |     0.10      |     0.10      |     0.20      |     0.30      |
| 10.00 < ≤ 25.00 |     0.05      |     0.10      |     0.15      |     0.25      |
| 25.00 < ≤ 50.00 |     0.05      |     0.05      |     0.05      |     0.15      |
|     50.00 <     |     0.00      |     0.00      |     0.05      |     0.05      |

**Cas 3 : $Aiu$ non isolée / $Aue$ isolée :**

|    $Aiu/Aue$    | $UV,ue = 0.0$ | $UV,ue = 0.3$ | $UV,ue = 3.0$ | $UV,ue = 9.0$ |
| :-------------: | :-----------: | :-----------: | :-----------: | :-----------: |
|     ≤ 0.25      |     0.35      |     0.50      |     0.85      |     0.95      |
|  0.25 < ≤ 0.50  |     0.20      |     0.35      |     0.70      |     0.90      |
|  0.50 < ≤ 0.75  |     0.15      |     0.25      |     0.65      |     0.85      |
|  0.75 < ≤ 1.00  |     0.15      |     0.20      |     0.55      |     0.80      |
|  1.00 < ≤ 1.25  |     0.10      |     0.15      |     0.50      |     0.75      |
|  1.25 < ≤ 2.00  |     0.05      |     0.10      |     0.40      |     0.65      |
|  2.00 < ≤ 2.50  |     0.05      |     0.10      |     0.35      |     0.60      |
|  2.50 < ≤ 3.00  |     0.05      |     0.10      |     0.30      |     0.55      |
|  3.00 < ≤ 3.50  |     0.05      |     0.05      |     0.25      |     0.50      |
|  3.50 < ≤ 4.00  |     0.05      |     0.05      |     0.25      |     0.45      |
|  4.00 < ≤ 6.00  |     0.00      |     0.05      |     0.20      |     0.35      |
|  6.00 < ≤ 8.00  |     0.00      |     0.05      |     0.15      |     0.30      |
| 8.00 < ≤ 10.00  |     0.00      |     0.05      |     0.10      |     0.25      |
| 10.00 < ≤ 25.00 |     0.00      |     0.00      |     0.10      |     0.20      |
| 25.00 < ≤ 50.00 |     0.00      |     0.00      |     0.05      |     0.10      |
|     50.00 <     |     0.00      |     0.00      |     0.00      |     0.05      |

**Cas 4 : $Aiu$ isolée / $Aue$ isolée :**

|    $Aiu/Aue$    | $UV,ue = 0.0$ | $UV,ue = 0.3$ | $UV,ue = 3.0$ | $UV,ue = 9.0$ |
| :-------------: | :-----------: | :-----------: | :-----------: | :-----------: |
|     ≤ 0.25      |     0.80      |     0.90      |     0.95      |     1.00      |
|  0.25 < ≤ 0.50  |     0.65      |     0.80      |     0.95      |     1.00      |
|  0.50 < ≤ 0.75  |     0.55      |     0.70      |     0.90      |     0.95      |
|  0.75 < ≤ 1.00  |     0.50      |     0.65      |     0.90      |     0.95      |
|  1.00 < ≤ 1.25  |     0.45      |     0.60      |     0.90      |     0.95      |
|  1.25 < ≤ 2.00  |     0.35      |     0.45      |     0.80      |     0.95      |
|  2.00 < ≤ 2.50  |     0.30      |     0.40      |     0.80      |     0.90      |
|  2.50 < ≤ 3.00  |     0.25      |     0.35      |     0.75      |     0.90      |
|  3.00 < ≤ 3.50  |     0.20      |     0.35      |     0.70      |     0.90      |
|  3.50 < ≤ 4.00  |     0.20      |     0.30      |     0.70      |     0.85      |
|  4.00 < ≤ 6.00  |     0.15      |     0.25      |     0.60      |     0.80      |
|  6.00 < ≤ 8.00  |     0.10      |     0.20      |     0.55      |     0.75      |
| 8.00 < ≤ 10.00  |     0.10      |     0.15      |     0.45      |     0.70      |
| 10.00 < ≤ 25.00 |     0.05      |     0.10      |     0.40      |     0.65      |
| 25.00 < ≤ 50.00 |     0.05      |     0.05      |     0.25      |     0.45      |
|     50.00 <     |     0.00      |     0.05      |     0.10      |     0.30      |

---

Les espaces tampons solarisés (vérandas, loggias fermées) non chauffés bénéficient d'apports solaires qui y génèrent des températures supérieures à celles atteintes dans les espaces non solarisés.

Rappelons que les vérandas chauffées sont traitées en surface habitable.

Dans le cas de vérandas ou loggias fermées non chauffées, les coefficients de réduction de température pris sont donnés dans le tableau ci-dessous :

| Zone climatique | Orientation de la véranda | Paroi donnant sur la véranda | $bver$ |
| :-------------: | :-----------------------: | :--------------------------: | :----: |
|       H1        |           Nord            |            Isolé             |  0.95  |
|       H1        |           Nord            |          Non isolé           |  0.85  |
|       H1        |        Est / Ouest        |            Isolé             |  0.63  |
|       H1        |        Est / Ouest        |          Non isolé           |  0.6   |
|       H1        |            Sud            |            Isolé             |  0.58  |
|       H1        |            Sud            |          Non isolé           |  0.55  |
|       H2        |           Nord            |            Isolé             |  0.95  |
|       H2        |           Nord            |          Non isolé           |  0.85  |
|       H2        |        Est / Ouest        |            Isolé             |  0.6   |
|       H2        |        Est / Ouest        |          Non isolé           |  0.58  |
|       H2        |            Sud            |            Isolé             |  0.57  |
|       H2        |            Sud            |          Non isolé           |  0.55  |
|       H3        |           Nord            |            Isolé             |  0.95  |
|       H3        |           Nord            |          Non isolé           |  0.85  |
|       H3        |        Est / Ouest        |            Isolé             |  0.53  |
|       H3        |        Est / Ouest        |          Non isolé           |  0.53  |
|       H3        |            Sud            |            Isolé             |  0.48  |
|       H3        |            Sud            |          Non isolé           |  0.55  |

Les orientations Nord intègrent les limites Nord-Est et Nord-Ouest.

Les orientations Sud intègrent les limites Sud-Est et Sud-Ouest.

L'orientation de la véranda prise en compte est celle de sa façade principale (avec la plus grande surface de vitrages verticaux). S'il existe plusieurs façades principales, c'est-à-dire qu'au moins deux façades d'orientation présentent de façon égale les surfaces vitrées les plus importantes, $bver$ est la moyenne des $bver$ sur ces orientations.

### 3.2 Calcul des U des parois opaques

---

**Données d'entrée :**

- Caractéristiques des parois (type, épaisseur, mitoyenneté, matériaux traditionnels)
- Caractéristique isolation (épaisseur, résistance, année d'isolation)
- Nombre d'appartements
- Retour d'isolation autour des menuiseries (avec ou sans)
- Hauteur moyenne sous plafond

---

On considère qu'un logement est chauffé par effet joule lorsque la chaleur est fournie par une résistance électrique.

Une paroi opaque (hors plancher bas) est considérée comme un mur dès lors que l'angle par rapport à l'horizontal est supérieur ou égal à 75°. Dans les autres cas, il s'agit d'un plancher haut.

#### 3.2.1 Calcul des $Umur$

##### 3.2.1.1 Schéma du calcul de $Umur$

Le calcul de $Umur$ suit la logique suivante :

1. Si $Umur$ est connu → saisir $Umur$ directement.
2. Si le type de mur est inconnu → $Umur_nu$ = 2.5
3. Si le type de mur est connu → $Umur_nu$ = Min($Umur0$ ; 2.5)
4. Si l'isolation est inconnue → $Umur$ = Min($Umur_nu$ ; $Umur_tab$)
5. Si l'isolation est absente → $Umur$ = $Umur_nu$
6. Si la résistance isolant est connue :
$$Umur = \frac{1}{\frac{1}{Umur\_nu} + R_{isolant}}$$
7. Si l'épaisseur isolant est connue :
$$Umur = \frac{1}{\frac{1}{Umur\_nu} + \frac{e}{0.04}}$$
8. Si l'année d'isolation est connue → Umur = Min(Umur_nu ; Umur_tab)
9. Si l'année d'isolation est inconnue : si année de construction ≤ 74 alors année d'isolation = 75-77, sinon année d'isolation = année de construction → Umur = Min(Umur_nu ; Umur_tab)

**Umur_tab** (W/(m².K)) selon l'année de construction ou d'isolation :

| Zone climatique |   Énergie   | Année de construction ou d'isolation | Valeur |
| :-------------: | :---------: | :----------------------------------: | :----: |
|       H1        | Effet joule |           ≤ 74 ou inconnu            |  2.5   |
|       H1        | Effet joule |                75–77                 |   1    |
|       H1        | Effet joule |                78–82                 |  0.8   |
|       H1        | Effet joule |                83–88                 |  0.7   |
|       H1        | Effet joule |                89–00                 |  0.45  |
|       H1        | Effet joule |                01–05                 |  0.4   |
|       H1        | Effet joule |                06–12                 |  0.36  |
|       H1        | Effet joule |                 ≥ 13                 |  0.23  |
|       H1        |   Autres    |           ≤ 74 ou inconnu            |  2.5   |
|       H1        |   Autres    |                75–77                 |   1    |
|       H1        |   Autres    |                78–82                 |  0.8   |
|       H1        |   Autres    |                83–88                 |  0.5   |
|       H1        |   Autres    |                89–00                 |  0.5   |
|       H1        |   Autres    |                01–05                 |  0.4   |
|       H1        |   Autres    |                06–12                 |  0.36  |
|       H1        |   Autres    |                 ≥ 13                 |  0.23  |
|       H2        | Effet joule |           ≤ 74 ou inconnu            |  2.5   |
|       H2        | Effet joule |                75–77                 |  1.05  |
|       H2        | Effet joule |                78–82                 |  0.84  |
|       H2        | Effet joule |                83–88                 |  0.74  |
|       H2        | Effet joule |                89–00                 |  0.47  |
|       H2        | Effet joule |                01–05                 |  0.4   |
|       H2        | Effet joule |                06–12                 |  0.36  |
|       H2        | Effet joule |                 ≥ 13                 |  0.23  |
|       H2        |   Autres    |           ≤ 74 ou inconnu            |  2.5   |
|       H2        |   Autres    |                75–77                 |  1.05  |
|       H2        |   Autres    |                78–82                 |  0.84  |
|       H2        |   Autres    |                83–88                 |  0.5   |
|       H2        |   Autres    |                89–00                 |  0.5   |
|       H2        |   Autres    |                01–05                 |  0.4   |
|       H2        |   Autres    |                06–12                 |  0.36  |
|       H2        |   Autres    |                 ≥ 13                 |  0.23  |
|       H3        | Effet joule |           ≤ 74 ou inconnu            |  2.5   |
|       H3        | Effet joule |                75–77                 |  1.11  |
|       H3        | Effet joule |                78–82                 |  0.88  |
|       H3        | Effet joule |                83–88                 |  0.78  |
|       H3        | Effet joule |                89–00                 |  0.5   |
|       H3        | Effet joule |                01–05                 |  0.47  |
|       H3        | Effet joule |                06–12                 |  0.4   |
|       H3        | Effet joule |                 ≥ 13                 |  0.25  |
|       H3        |   Autres    |           ≤ 74 ou inconnu            |  2.5   |
|       H3        |   Autres    |                75–77                 |  1.11  |
|       H3        |   Autres    |                78–82                 |  0.88  |
|       H3        |   Autres    |                83–88                 |  0.56  |
|       H3        |   Autres    |                89–00                 |  0.5   |
|       H3        |   Autres    |                01–05                 |  0.47  |
|       H3        |   Autres    |                06–12                 |  0.4   |
|       H3        |   Autres    |                 ≥ 13                 |  0.25  |

##### 3.2.1.2 Calcul des $Umur0$

$Umur0$ est le coefficient de transmission thermique du mur non isolé (W/(m².K)).

| Type                                                                                | Épaisseur (en cm) | $Umur0$ |
| ----------------------------------------------------------------------------------- | :---------------: | :-----: |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |       ≤ 20        |   3.2   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        25         |  2.85   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        30         |  2.65   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        35         |  2.45   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        40         |   2.3   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        45         |  2.15   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        50         |  2.05   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        55         |  1.90   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        60         |  1.80   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        65         |  1.75   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        70         |  1.65   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |        75         |  1.55   |
| Murs en pierre de taille et moellons — Murs constitués d'un seul matériau / inconnu |       ≥ 80        |  1.50   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |        50         |  1.90   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |        55         |  1.75   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |        60         |  1.60   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |        65         |  1.50   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |        70         |  1.45   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |        75         |  1.30   |
| Murs en pierre de taille et moellons — Murs avec remplissage tout venant            |       ≥ 80        |  1.25   |
| Murs en pisé ou béton de terre stabilisé                                            |       ≤ 40        |  1.75   |
| Murs en pisé ou béton de terre stabilisé                                            |        45         |  1.65   |
| Murs en pisé ou béton de terre stabilisé                                            |        50         |  1.55   |
| Murs en pisé ou béton de terre stabilisé                                            |        55         |  1.45   |
| Murs en pisé ou béton de terre stabilisé                                            |        60         |  1.35   |
| Murs en pisé ou béton de terre stabilisé                                            |        65         |  1.25   |
| Murs en pisé ou béton de terre stabilisé                                            |        70         |   1.2   |
| Murs en pisé ou béton de terre stabilisé                                            |        75         |  1.15   |
| Murs en pisé ou béton de terre stabilisé                                            |       ≥ 80        |   1.1   |
| Murs en pans de bois — Sans remplissage tout venant                                 |        ≤ 8        |    3    |
| Murs en pans de bois — Sans remplissage tout venant                                 |        10         |   2.7   |
| Murs en pans de bois — Sans remplissage tout venant                                 |        13         |  2.35   |
| Murs en pans de bois — Sans remplissage tout venant                                 |        18         |  1.98   |
| Murs en pans de bois — Sans remplissage tout venant                                 |        24         |  1.65   |
| Murs en pans de bois — Sans remplissage tout venant                                 |       ≥ 32        |  1.35   |
| Murs en pans de bois — Avec remplissage tout venant                                 |        ≤ 8        |   1.7   |
| Murs en pans de bois — Avec remplissage tout venant                                 |        10         |   1.7   |
| Murs en pans de bois — Avec remplissage tout venant                                 |        13         |   1.7   |
| Murs en pans de bois — Avec remplissage tout venant                                 |        18         |   1.7   |
| Murs en pans de bois — Avec remplissage tout venant                                 |        24         |   1.7   |
| Murs en pans de bois — Avec remplissage tout venant                                 |       ≥ 32        |   1.7   |
| Murs bois (rondins)                                                                 |       ≤ 10        |   1.6   |
| Murs bois (rondins)                                                                 |        15         |   1.2   |
| Murs bois (rondins)                                                                 |        20         |  0.95   |
| Murs bois (rondins)                                                                 |       ≥ 25        |   0.8   |
| Murs en briques pleines simples                                                     |        ≤ 9        |   3.9   |
| Murs en briques pleines simples                                                     |        12         |  3.45   |
| Murs en briques pleines simples                                                     |        15         |  3.05   |
| Murs en briques pleines simples                                                     |        19         |  2.75   |
| Murs en briques pleines simples                                                     |        23         |   2.5   |
| Murs en briques pleines simples                                                     |        28         |  2.25   |
| Murs en briques pleines simples                                                     |        34         |    2    |
| Murs en briques pleines simples                                                     |        45         |  1.65   |
| Murs en briques pleines simples                                                     |        55         |  1.45   |
| Murs en briques pleines simples                                                     |        60         |  1.35   |
| Murs en briques pleines simples                                                     |       ≥ 70        |   1.2   |
| Murs en briques pleines doubles avec lame d'air                                     |       ≤ 20        |    2    |
| Murs en briques pleines doubles avec lame d'air                                     |        25         |  1.85   |
| Murs en briques pleines doubles avec lame d'air                                     |        30         |  1.65   |
| Murs en briques pleines doubles avec lame d'air                                     |        35         |  1.55   |
| Murs en briques pleines doubles avec lame d'air                                     |        45         |  1.35   |
| Murs en briques pleines doubles avec lame d'air                                     |        50         |  1.25   |
| Murs en briques pleines doubles avec lame d'air                                     |       ≥ 60        |   1.2   |
| Murs en briques creuses                                                             |       ≤ 15        |  2.15   |
| Murs en briques creuses                                                             |        18         |  2.05   |
| Murs en briques creuses                                                             |        20         |    2    |
| Murs en briques creuses                                                             |        23         |  1.85   |
| Murs en briques creuses                                                             |        25         |   1.7   |
| Murs en briques creuses                                                             |        28         |  1.68   |
| Murs en briques creuses                                                             |        33         |  1.65   |
| Murs en briques creuses                                                             |        38         |  1.55   |
| Murs en briques creuses                                                             |       ≥ 43        |   1.4   |
| Murs en blocs de béton pleins                                                       |       ≤ 20        |   2.9   |
| Murs en blocs de béton pleins                                                       |        23         |  2.75   |
| Murs en blocs de béton pleins                                                       |        25         |   2.6   |
| Murs en blocs de béton pleins                                                       |        28         |   2.5   |
| Murs en blocs de béton pleins                                                       |        30         |   2.4   |
| Murs en blocs de béton pleins                                                       |        33         |   2.3   |
| Murs en blocs de béton pleins                                                       |        35         |   2.2   |
| Murs en blocs de béton pleins                                                       |        38         |   2.1   |
| Murs en blocs de béton pleins                                                       |       ≥ 40        |  2.05   |
| Murs en blocs de béton creux                                                        |       ≤ 20        |   2.8   |
| Murs en blocs de béton creux                                                        |        23         |  2.65   |
| Murs en blocs de béton creux                                                        |       ≥ 25        |   2.3   |
| Murs en béton banché — Béton banché                                                 |       ≤ 20        |   2.9   |
| Murs en béton banché — Béton banché                                                 |       22.5        |  2.75   |
| Murs en béton banché — Béton banché                                                 |        25         |  2.65   |
| Murs en béton banché — Béton banché                                                 |        28         |   2.5   |
| Murs en béton banché — Béton banché                                                 |        30         |   2.4   |
| Murs en béton banché — Béton banché                                                 |        35         |   2.2   |
| Murs en béton banché — Béton banché                                                 |        40         |  2.05   |
| Murs en béton banché — Béton banché                                                 |       ≥ 45        |   1.9   |
| Murs en béton banché — Béton de mâchefer                                            |       ≤ 20        |  2.75   |
| Murs en béton banché — Béton de mâchefer                                            |       22.5        |   2.5   |
| Murs en béton banché — Béton de mâchefer                                            |        25         |   2.4   |
| Murs en béton banché — Béton de mâchefer                                            |        28         |  2.25   |
| Murs en béton banché — Béton de mâchefer                                            |        30         |  2.15   |
| Murs en béton banché — Béton de mâchefer                                            |        35         |  1.95   |
| Murs en béton banché — Béton de mâchefer                                            |        40         |   1.8   |
| Brique terre cuite alvéolaire                                                       |        30         |  0.47   |
| Brique terre cuite alvéolaire                                                       |       37.5        |  0.40   |
| Mur en béton cellulaire — Construction < 2013                                       |        15         |  0.90   |
| Mur en béton cellulaire — Construction < 2013                                       |       17.5        |  0.79   |
| Mur en béton cellulaire — Construction < 2013                                       |        20         |  0.70   |
| Mur en béton cellulaire — Construction < 2013                                       |       22.5        |  0.63   |
| Mur en béton cellulaire — Construction < 2013                                       |        25         |  0.57   |
| Mur en béton cellulaire — Construction < 2013                                       |       27.5        |  0.53   |
| Mur en béton cellulaire — Construction < 2013                                       |        30         |  0.49   |
| Mur en béton cellulaire — Construction < 2013                                       |       32.5        |  0.45   |
| Mur en béton cellulaire — Construction < 2013                                       |        35         |  0.42   |
| Mur en béton cellulaire — Construction < 2013                                       |       37.5        |  0.40   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |        15         |  0.69   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |       17.5        |  0.60   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |        20         |  0.53   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |       22.5        |  0.48   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |        25         |  0.43   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |       27.5        |  0.40   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |        30         |  0.36   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |       32.5        |  0.30   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |        35         |  0.28   |
| Mur en béton cellulaire — Construction ≥ 2013                                       |       37.5        |  0.22   |
| Murs sandwich béton/isolant/béton                                                   |       ≤ 15        |   0.9   |
| Murs sandwich béton/isolant/béton                                                   |        20         |  0.48   |
| Murs sandwich béton/isolant/béton                                                   |       ≥ 25        |  0.45   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        10         |  0.45   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        15         |  0.35   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        20         |  0.26   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        25         |  0.21   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        30         |  0.17   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        35         |  0.15   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |        40         |  0.13   |
| Murs en ossature bois avec isolant en remplissage ≥ 2006                            |       ≥ 45        |  0.11   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        10         |  0.52   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        15         |  0.41   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        20         |   0.3   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        25         |  0.24   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        30         |   0.2   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        35         |  0.17   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |        40         |  0.15   |
| Murs en ossature bois avec isolant en remplissage 2001-2005                         |       ≥ 45        |  0.13   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        10         |  0.65   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        15         |  0.45   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        20         |  0.34   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        25         |  0.28   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        30         |  0.23   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        35         |   0.2   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |        40         |  0.18   |
| Murs en ossature bois avec isolant en remplissage < 2001                            |       ≥ 45        |  0.16   |
| Murs en ossature bois avec remplissage tout venant                                  |         —         |   1.7   |
| Murs en ossature bois sans remplissage                                              |        ≤ 8        |    3    |
| Murs en ossature bois sans remplissage                                              |        10         |   2.7   |
| Murs en ossature bois sans remplissage                                              |        13         |  2.35   |
| Murs en ossature bois sans remplissage                                              |        18         |  1.98   |
| Murs en ossature bois sans remplissage                                              |        24         |  1.65   |
| Murs en ossature bois sans remplissage                                              |       ≥ 32        |  1.35   |
| Cloison de plâtre                                                                   |         -         |  3.33   |

Pour les parois dites « anciennes », c'est-à-dire constituées de matériaux traditionnels à savoir pierres, terre, mur à colombage, brique ancienne, la présence d'un enduit isolant n'est pas considérée comme une isolation. Cependant, cet enduit apporte une correction d'isolation qu'il faut prendre en compte en considérant :

$$Umur0 = \frac{1}{\frac{1}{Umur0\_sansEnduit} + R\_enduit}$$

Avec :

- $R\_enduit = 0.7$ m².K/W

Pour l'ensemble des parois, la présence d'un doublage apporte une résistance thermique supplémentaire calculée comme suit :

$$Umur\_doublage = \frac{1}{\frac{1}{Umur0} + R\_doublage}$$

Avec les valeurs de résistances suivantes :

- Pour un mur avec un doublage rapporté de nature indéterminée ou avec lame d'air de moins de 15 mm : $R\_doublage = 0.1$ m².K/W
- Pour un mur avec un doublage rapporté avec une lame d'air de plus de 15 mm ou avec un matériau de doublage connu (plâtre, brique, bois) : $R\_doublage = 0.21$ m².K/W

Les murs en pavés de verre sont traités comme des parois vitrées (voir paragraphe 3.3).

Pour les murs non répertoriés, saisir directement les coefficients de transmission thermique quand ils sont justifiés.

Pour les murs doubles ou de composants multiples connus et justifiés, saisir directement le U du mur calculé.

#### 3.2.2 Calcul des Uplancher bas ($Upb$)

##### 3.2.2.1 Schéma du calcul de $Upb$

**Si le plancher donne sur l'extérieur ou un local non chauffé (hors sous-sol) :**

Le calcul de $Upb$ suit la logique suivante :

1. Si Upb est connu → saisir Upb directement.
2. Si le type de plancher est inconnu → $Upb0 = 2$
3. Si le type de plancher est connu → déterminer Upb0
4. Si l'isolation est inconnue → $Upb = Min(Upb0 ; Upb_tab)$
5. Si l'isolation est absente → $Upb = Upb0$
6. Si la résistance isolant est connue :
$$Upb = \frac{1}{\frac{1}{Upb0} + R\_isolant}$$
7. Si l'épaisseur isolant est connue :
$$Upb = \frac{1}{\frac{1}{Upb0} + \frac{e}{0.042}}$$
8. Si l'année d'isolation est connue → $Upb = Min(Upb0 ; Upb_tab)$
9. Si l'année d'isolation est inconnue :
   1. si année de construction ≤ 74 alors année d'isolation = 75-77
   2. sinon année d'isolation = année de construction → $Upb = Min(Upb0 ; Upb_tab)$

$Upb\_tab$ (W/(m².K)) selon l'année de construction ou d'isolation :

| Année de construction ou d'isolation | H1 Effet joule | H1 Autres | H2 Effet joule | H2 Autres | H3 Effet joule | H3 Autres |
| ------------------------------------ | -------------- | --------- | -------------- | --------- | -------------- | --------- |
| ≤ 74 ou inconnu                      | 2              | 2         | 2              | 2         | 2              | 2         |
| 75-77                                | 0.9            | 0.9       | 0.95           | 0.95      | 1              | 1         |
| 78-82                                | 0.8            | 0.9       | 0.84           | 0.95      | 0.89           | 1         |
| 83-88                                | 0.55           | 0.8       | 0.58           | 0.74      | 0.78           | 0.89      |
| 89-00                                | 0.55           | 0.5       | 0.58           | 0.63      | 0.5            | 0.56      |
| 01-05                                | 0.3            | 0.3       | 0.3            | 0.3       | 0.47           | 0.47      |
| 06-12                                | 0.27           | 0.27      | 0.27           | 0.27      | 0.4            | 0.4       |
| ≥ 13                                 | 0.23           | 0.23      | 0.23           | 0.23      | 0.25           | 0.25      |

Pour les vides sanitaires, les sous-sols non chauffés et terre-plein, le calcul des déperditions se fait avec un coefficient Ue en remplacement de Upb. Le calcul de Upb est toutefois nécessaire pour obtenir la valeur du coefficient Ue, selon les tableaux ci-dessous.

Upb est le coefficient de transmission thermique de la partie du plancher située entre l'ambiance intérieure et le vide sanitaire, le sous-sol ou le terre-plein. Il est calculé selon le schéma précédent (voir « plancher donnant sur l'extérieur ou un local non chauffé »), en W/(m².K).

Les données ne figurant pas dans le tableau peuvent être obtenues par interpolation et extrapolation en traçant des droites entre les valeurs les plus proches présentes dans le tableau.

- **P** : périmètre ou linéaire du plancher déperditif du bâtiment ou du lot sur terre-plein, vide sanitaire ou sous-sol non chauffé donnant sur l'extérieur ou un local non chauffé (m)
- **S** : surface du plancher du bâtiment ou du lot sur terre-plein, vide sanitaire ou sous-sol non chauffé (m²)
- **2S/P** est arrondi à l'entier le plus proche

Le Ue d'un plancher est un Umoyen pour tout le plancher du bâtiment. Il prend en compte l'isolation périphérique du plancher bas. Dès lors, tous les appartements d'un immeuble donnant sur un même terre-plein ont le même Ue.

Le Ue d'un plancher bas d'immeuble est toujours calculé à l'immeuble, même dans le cas d'un DPE seulement sur un appartement.

**Valeurs de Ue (W/(m².K)) selon Upb et 2S/P — Si le plancher est sur vide sanitaire ou sous-sol non chauffé :**

| 2S/P | Upb = 3.33 | Upb = 1.43 | Upb = 0.83 | Upb = 0.45 | Upb = 0.41 | Upb = 0.37 | Upb = 0.34 | Upb = 0.31 |
| ---- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| 3    | 0.45       | 0.42       | 0.39       | 0.36       | 0.33       | 0.3        | 0.28       | 0.26       |
| 4    | 0.43       | 0.4        | 0.37       | 0.34       | 0.31       | 0.29       | 0.27       | 0.25       |
| 5    | 0.38       | 0.36       | 0.34       | 0.32       | 0.3        | 0.28       | 0.26       | 0.25       |
| 6    | 0.37       | 0.35       | 0.33       | 0.31       | 0.29       | 0.27       | 0.25       | 0.24       |
| 7    | 0.36       | 0.34       | 0.32       | 0.3        | 0.28       | 0.26       | 0.24       | 0.23       |
| 8    | 0.35       | 0.33       | 0.31       | 0.29       | 0.27       | 0.25       | 0.24       | 0.22       |
| 9    | 0.34       | 0.32       | 0.3        | 0.28       | 0.26       | 0.24       | 0.23       | 0.22       |
| 10   | 0.33       | 0.31       | 0.29       | 0.27       | 0.25       | 0.24       | 0.22       | 0.21       |
| 12   | 0.28       | 0.27       | 0.26       | 0.25       | 0.24       | 0.22       | 0.21       | 0.2        |
| 14   | 0.28       | 0.27       | 0.26       | 0.24       | 0.23       | 0.21       | 0.2        | 0.19       |
| 16   | 0.28       | 0.27       | 0.25       | 0.23       | 0.21       | 0.2        | 0.19       | 0.18       |
| 18   | 0.28       | 0.26       | 0.24       | 0.22       | 0.2        | 0.19       | 0.19       | 0.18       |
| 20   | 0.24       | 0.23       | 0.22       | 0.21       | 0.2        | 0.19       | 0.18       | 0.17       |

**Valeurs de Ue (W/(m².K)) — Si le plancher donne sur terre-plein, bâtiment construit avant 2001 :**

| 2S/P | Upb = 3.4 | Upb = 1.5 | Upb = 0.85 | Upb = 0.59 | Upb = 0.46 |
| ---- | --------- | --------- | ---------- | ---------- | ---------- |
| 3    | 0.78      | 0.56      | 0.43       | 0.35       | 0.3        |
| 4    | 0.68      | 0.51      | 0.4        | 0.33       | 0.28       |
| 5    | 0.6       | 0.46      | 0.38       | 0.32       | 0.27       |
| 6    | 0.54      | 0.43      | 0.35       | 0.3        | 0.26       |
| 7    | 0.49      | 0.39      | 0.33       | 0.28       | 0.25       |
| 8    | 0.45      | 0.37      | 0.31       | 0.27       | 0.24       |
| 9    | 0.42      | 0.34      | 0.29       | 0.26       | 0.23       |
| 10   | 0.39      | 0.32      | 0.28       | 0.24       | 0.22       |
| 12   | 0.35      | 0.29      | 0.25       | 0.22       | 0.2        |
| 14   | 0.31      | 0.26      | 0.23       | 0.2        | 0.19       |
| 16   | 0.28      | 0.24      | 0.21       | 0.19       | 0.17       |
| 18   | 0.26      | 0.22      | 0.2        | 0.18       | 0.16       |
| 20   | 0.24      | 0.21      | 0.18       | 0.17       | 0.15       |

**Valeurs de Ue (W/(m².K)) — Si le plancher donne sur terre-plein, bâtiments à partir de 2001 :**

| 2S/P | Upb = 3.4 | Upb = 1.5 | Upb = 0.85 | Upb = 0.6 | Upb = 0.46 | Upb = 0.37 | Upb = 0.31 |
| ---- | --------- | --------- | ---------- | --------- | ---------- | ---------- | ---------- |
| 3    | 0.7       | 0.6       | 0.49       | 0.39      | 0.33       | 0.28       | 0.25       |
| 4    | 0.65      | 0.55      | 0.45       | 0.36      | 0.31       | 0.26       | 0.23       |
| 5    | 0.58      | 0.5       | 0.42       | 0.34      | 0.29       | 0.25       | 0.22       |
| 6    | 0.52      | 0.45      | 0.38       | 0.32      | 0.27       | 0.24       | 0.21       |
| 7    | 0.48      | 0.42      | 0.36       | 0.3       | 0.26       | 0.23       | 0.2        |
| 8    | 0.45      | 0.39      | 0.33       | 0.28      | 0.25       | 0.22       | 0.2        |
| 9    | 0.39      | 0.35      | 0.31       | 0.27      | 0.24       | 0.21       | 0.19       |
| 10   | 0.38      | 0.34      | 0.3        | 0.26      | 0.23       | 0.2        | 0.18       |
| 12   | 0.35      | 0.31      | 0.27       | 0.23      | 0.21       | 0.19       | 0.17       |
| 14   | 0.3       | 0.27      | 0.24       | 0.21      | 0.19       | 0.17       | 0.16       |
| 16   | 0.26      | 0.24      | 0.22       | 0.2       | 0.18       | 0.16       | 0.15       |
| 18   | 0.25      | 0.24      | 0.21       | 0.18      | 0.17       | 0.15       | 0.14       |
| 20   | 0.23      | 0.21      | 0.19       | 0.17      | 0.16       | 0.14       | 0.13       |

###### 3.2.2.2 Calcul des Upb0

Upb0 est le coefficient de transmission thermique du plancher bas non isolé (W/(m².K)).

| Type de plancher                                             | Upb0 W/(m².K) |
| ------------------------------------------------------------ | ------------- |
| Plancher avec ou sans remplissage                            | 1.45          |
| Plancher entre solives bois avec ou sans remplissage         | 1.1           |
| Bardeaux et remplissage                                      | 1.1           |
| Plancher bois sur solives bois                               | 1.6           |
| Plancher entre solives métalliques avec ou sans remplissage  | 1.45          |
| Plancher bois sur solives métalliques                        | 1.6           |
| Voutains sur solives métalliques                             | 1.75          |
| Plancher lourd type, entrevous terre-cuite, poutrelles béton | 2             |
| Voutains en briques ou moellons                              | 0.8           |
| Dalle béton                                                  | 2             |
| Plancher à entrevous isolant                                 | 0.45          |

Pour les planchers bas non répertoriés, saisir directement les coefficients de transmission thermique Upb0 quand ils sont justifiés. Les données des règles TH-U peuvent être utilisées.

#### 3.2.3 Calcul des Uplancher haut (Uph)

##### 3.2.3.1 Schéma du calcul de Uph

Lorsque le local au-dessus du logement est un local non chauffé, ou un local autre que d'habitation, Uph_tab est pris dans la catégorie « Terrasse ».

Le calcul de Uph suit la logique suivante :

1. Si Uph est connu → saisir Uph directement.
2. Si le type de plafond est inconnu → Uph0 = 2.5
3. Si le type de plafond est connu → déterminer Uph0
4. Si l'isolation est inconnue → Uph = Min(Uph0 ; Uph_tab)
5. Si l'isolation est absente → Uph = Uph0
6. Si la résistance isolant est connue :
$$Uph = \frac{1}{\frac{1}{Uph0} + R_{isolant}}$$
7. Si l'épaisseur isolant est connue :
$$Uph = \frac{1}{\frac{1}{Uph0} + \frac{e}{0.04}}$$
8. Si l'année d'isolation est connue → Uph = Min(Uph0 ; Uph_tab)
9. Si l'année d'isolation est inconnue : si année de construction ≤ 74 alors année d'isolation = 75-77, sinon année d'isolation = année de construction → Uph = Min(Uph0 ; Uph_tab)

**Uph_tab** (W/(m².K)) selon l'année de construction ou d'isolation :

| Année            | H1 Combles Effet joule | H1 Combles Autres | H2 Combles Effet joule | H2 Combles Autres | H3 Combles Effet joule | H3 Combles Autres | H1 Terrasse Effet joule | H1 Terrasse Autres | H2 Terrasse Effet joule | H2 Terrasse Autres | H3 Terrasse Effet joule | H3 Terrasse Autres |
| ---------------- | ---------------------- | ----------------- | ---------------------- | ----------------- | ---------------------- | ----------------- | ----------------------- | ------------------ | ----------------------- | ------------------ | ----------------------- | ------------------ |
| ≤ 74 ou inconnue | 2.5                    | 2.5               | 2.5                    | 2.5               | 2.5                    | 2.5               | 2.5                     | 2.5                | 2.5                     | 2.5                | 2.5                     | 2.5                |
| 75-77            | 0.5                    | 0.5               | 0.53                   | 0.53              | 0.56                   | 0.56              | 0.75                    | 0.75               | 0.79                    | 0.79               | 0.83                    | 0.83               |
| 78-82            | 0.4                    | 0.5               | 0.42                   | 0.53              | 0.44                   | 0.56              | 0.7                     | 0.75               | 0.74                    | 0.79               | 0.78                    | 0.83               |
| 83-88            | 0.3                    | 0.3               | 0.32                   | 0.32              | 0.33                   | 0.33              | 0.4                     | 0.55               | 0.42                    | 0.58               | 0.44                    | 0.61               |
| 89-00            | 0.25                   | 0.25              | 0.26                   | 0.26              | 0.3                    | 0.3               | 0.35                    | 0.4                | 0.37                    | 0.42               | 0.39                    | 0.44               |
| 01-05            | 0.23                   | 0.23              | 0.23                   | 0.23              | 0.3                    | 0.3               | 0.3                     | 0.3                | 0.3                     | 0.3                | 0.3                     | 0.3                |
| 06-12            | 0.2                    | 0.2               | 0.2                    | 0.2               | 0.25                   | 0.25              | 0.27                    | 0.27               | 0.27                    | 0.27               | 0.27                    | 0.27               |
| ≥ 13             | 0.14                   | 0.14              | 0.14                   | 0.14              | 0.14                   | 0.14              | 0.14                    | 0.14               | 0.14                    | 0.14               | 0.14                    | 0.14               |

##### 3.2.3.2 Calcul des Uph0

Uph0 est le coefficient de transmission thermique du plancher haut non isolé (W/(m².K)).

| Type de plafond                                             | Uph0 W/(m².K) |
| ----------------------------------------------------------- | ------------- |
| Plafond avec ou sans remplissage                            | 1.45          |
| Bardeaux et remplissage                                     | 1.2           |
| Plafond bois sous solives bois                              | 2.3           |
| Plafond bois sous solives métalliques                       | 2.5           |
| Plafond entre solives bois avec ou sans remplissage         | 1.2           |
| Plafond entre solives métalliques avec ou sans remplissage  | 1.45          |
| Dalle béton                                                 | 2.5           |
| Plafond lourd type, entrevous terre-cuite, poutrelles béton | 2.5           |
| Combles aménagés sous rampant                               | 2.5           |
| Toiture en chaume                                           | 0.24          |
| Plafond en plaque de plâtre                                 | 2.5           |

Les toitures en bac acier sont traitées comme des combles aménagés sous rampants : Uph0 = 2.5 W/(m².K).

Pour les murs, plafonds, planchers non répertoriés, saisir directement les coefficients de transmission thermique quand ceux-ci peuvent être justifiés. Les données des règles TH-U peuvent être utilisées à défaut.

Attention : Les valeurs par défaut des caractéristiques des parois dépendent des années de construction dans certains cas. Pour les bâtiments ayant fait l'objet d'extension, les valeurs par défaut des caractéristiques des parois peuvent donc être différentes entre l'extension et le bâtiment originel.

### 3.3 Calcul des U des parois vitrées et des portes

---

**Données d'entrée :**

- Type de vitrage (simple, double…)
- Épaisseur lame d'air
- Présence d'une couche peu émissive
- Gaz de remplissage
- Inclinaison vitrage
- Type de menuiserie
- Type de volets
- Type de porte

---

Les grandes surfaces vitrées des vérandas chauffées seront traitées comme des portes-fenêtres avec des menuiseries au nu extérieur.

Les parois en brique de verre sont traitées comme des parois vitrées avec :

- Brique de verre pleine : Uw = 3.5 W/(m².K)
- Brique de verre creuse : Uw = 2 W/(m².K)

Les parois en polycarbonate sont traitées comme des parois vitrées avec : Uw = 3 W/(m².K)

Définition de l'inclinaison des baies pour le calcul des U :

- Paroi verticale = angle par rapport à l'horizontal ≥ 75°
- Paroi horizontale = angle par rapport à l'horizontal < 75°

Le coefficient U des fenêtres est connu : saisir Uw et caractériser les occultations pour déterminer Ujn.

Si Uw est inconnu alors suivre la démarche suivante :

1. Détermination de Ug à partir du type de vitrage
2. Détermination de Uw à partir de Ug, du type de paroi vitrée et de la menuiserie
3. Détermination de Ujn à partir de Uw et du type de fermeture
4. Si présence de protections solaires : Ubaie = Ujn ; sinon : Ubaie = Uw

Avec :

- **Ug** : coefficient de transmission thermique du vitrage (W/(m².K))
- **Uw** : coefficient de transmission thermique de la fenêtre ou de la porte-fenêtre (vitrage + menuiserie) (W/(m².K))
- **Ujn** : coefficient de transmission thermique de la fenêtre ou de la porte-fenêtre avec les protections solaires (W/(m².K))

#### 3.3.1 Détermination de la performance du vitrage Ug

##### Simple vitrage et survitrage

Pour un simple vitrage, quelle que soit l'épaisseur du verre, prendre :

- Ug = 5.8 W/(m².K) pour un vitrage vertical ou horizontal

Le Ug d'un survitrage est déterminé en apportant une majoration de 0.1 W/(m².K) au Ug du double vitrage rempli à l'air sec ayant la même épaisseur de lame d'air. Les épaisseurs des lames d'air pour le survitrage sont plafonnées à 20 mm. C'est-à-dire que toute lame d'air d'un survitrage d'épaisseur supérieure à 20 mm sera traitée dans les calculs comme une lame d'air de 20 mm d'épaisseur.

##### Double vitrage

Attention : si la valeur de l'épaisseur de la lame d'air n'est pas dans le tableau présenté, prendre la valeur directement inférieure qui s'y trouve.

###### Double vitrage vertical

**Remplissage air sec ou inconnu :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         3.3          |         2.45          |
|              8               |         3.1          |          2.1          |
|              10              |         2.9          |          1.8          |
|              12              |         2.8          |          1.6          |
|              14              |         2.8          |          1.5          |
|              15              |         2.7          |          1.4          |
|              16              |         2.7          |          1.4          |
|              18              |         2.7          |          1.4          |
|              20              |         2.7          |          1.4          |

**Remplissage Argon ou Krypton :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |          3           |           2           |
|              8               |         2.9          |          1.7          |
|              10              |         2.8          |          1.4          |
|              12              |         2.7          |          1.3          |
|              14              |         2.6          |          1.2          |
|              15              |         2.6          |          1.1          |
|              16              |         2.6          |          1.1          |
|              18              |         2.6          |          1.1          |
|              20              |         2.6          |          1.1          |

###### Double vitrage horizontal

**Remplissage air sec ou inconnu :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         3.7          |          2.6          |
|              8               |         3.4          |          2.2          |
|              10              |         3.2          |          1.9          |
|              12              |         3.1          |          1.7          |
|              14              |         3.1          |          1.6          |
|              15              |         2.9          |          1.5          |
|              16              |         2.9          |          1.5          |
|              18              |         2.9          |          1.5          |
|              20              |         2.9          |          1.5          |

**Remplissage Argon ou Krypton :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         3.3          |          2.1          |
|              8               |         3.2          |          1.8          |
|              10              |         3.1          |          1.5          |
|              12              |         2.9          |          1.4          |
|              14              |         2.8          |          1.2          |
|              15              |         2.8          |          1.1          |
|              16              |         2.8          |          1.1          |
|              18              |         2.8          |          1.1          |
|              20              |         2.8          |          1.1          |

##### Triple vitrage

Attention : Si un triple vitrage a des épaisseurs de lame d'air différentes, considérer que c'est un triple vitrage dont l'épaisseur de chaque lame d'air est la moitié de l'épaisseur totale des deux lames d'air (ou la valeur consignée dans les tableaux précédents la plus proche de la moitié de l'épaisseur).

Exemple : pour un triple vitrage 4/10/4/12/4, considérer que c'est équivalent à un 4/10/4/10/4.

Par défaut, les doubles et triples vitrages installés à partir de 2006 sont tous considérés remplis à l'Argon ou au Krypton.

Si le Ug d'un vitrage est connu et justifié, le saisir directement.

###### Triple vitrage vertical

**Remplissage air sec ou inconnu :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         2.3          |          1.7          |
|              8               |         2.1          |          1.4          |
|              10              |         2.0          |          1.2          |
|              12              |         1.9          |          1.1          |
|              14              |         1.8          |          1.0          |
|              15              |         1.8          |          0.9          |
|              16              |         1.8          |          0.9          |
|              18              |         1.7          |          0.8          |
|              20              |         1.7          |          0.8          |

**Remplissage Argon ou Krypton :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         2.1          |          1.5          |
|              8               |         1.9          |          1.2          |
|              10              |         1.8          |          1.0          |
|              12              |         1.8          |          0.9          |
|              14              |         1.7          |          0.8          |
|              15              |         1.7          |          0.7          |
|              16              |         1.7          |          0.7          |
|              18              |         1.6          |          0.6          |
|              20              |         1.6          |          0.6          |

Attention : si la valeur de l'épaisseur de la lame d'air n'est pas dans le tableau présenté, prendre la valeur directement inférieure qui s'y trouve.

###### Triple vitrage horizontal

**Remplissage air sec ou inconnu :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         2.5          |          1.8          |
|              8               |         2.2          |          1.5          |
|              10              |         2.1          |          1.2          |
|              12              |         2.0          |          1.1          |
|              14              |         1.9          |          1.0          |
|              15              |         1.9          |          0.9          |
|              16              |         1.9          |          0.9          |
|              18              |         1.8          |          0.8          |
|              20              |         1.8          |          0.8          |

**Remplissage Argon ou Krypton :**

| Épaisseur de lame d'air (mm) | Vitrages non traités | Vitrages peu émissifs |
| :--------------------------: | :------------------: | :-------------------: |
|              6               |         2.2          |          1.6          |
|              8               |         2.0          |          1.2          |
|              10              |         1.9          |          1.0          |
|              12              |         1.9          |          0.9          |
|              14              |         1.8          |          0.8          |
|              15              |         1.8          |          0.7          |
|              16              |         1.8          |          0.7          |
|              18              |         1.7          |          0.6          |
|              20              |         1.7          |          0.6          |

#### 3.3.2 Coefficients Uw des fenêtres / portes-fenêtres

Les baies sans ouverture possible (ni battantes ni coulissantes) et les baies oscillantes seront traitées comme battantes dans toute la suite.

Dans la suite, les Uw associés à des Ug non présents dans les tableaux peuvent être obtenus par interpolation ou extrapolation avec les deux Ug tabulés les plus proches.

##### Menuiserie métallique à rupture de pont thermique

|  Ug   | Fenêtre battante | Fenêtre coulissante | Porte-Fenêtre battante | Porte-Fenêtre coulissante |
| :---: | :--------------: | :-----------------: | :--------------------: | :-----------------------: |
|  0.5  |       1.3        |         1.4         |          1.0           |            1.2            |
|  0.6  |       1.4        |         1.5         |          1.1           |            1.3            |
|  0.7  |       1.5        |         1.6         |          1.2           |            1.4            |
|  0.8  |       1.6        |         1.6         |          1.3           |            1.5            |
|  0.9  |       1.6        |         1.7         |          1.4           |            1.6            |
|   1   |       1.7        |         1.8         |          1.5           |            1.6            |
|  1.1  |       1.8        |         1.9         |          1.6           |            1.7            |
|  1.2  |       1.9        |         2.0         |          1.7           |            1.8            |
|  1.3  |       2.0        |         2.0         |          1.7           |            1.9            |
|  1.4  |       2.1        |         2.1         |          1.8           |            2.0            |
|  1.5  |       2.1        |         2.2         |          1.9           |            2.1            |
|  1.6  |       2.2        |         2.3         |          2.0           |            2.2            |
|  1.7  |       2.3        |         2.4         |          2.1           |            2.3            |
|  1.8  |       2.4        |         2.4         |          2.2           |            2.4            |
|  1.9  |       2.5        |         2.5         |          2.3           |            2.5            |
|   2   |       2.6        |         2.6         |          2.4           |            2.5            |
|  2.1  |       2.7        |         2.8         |          2.5           |            2.6            |
|  2.2  |       2.7        |         2.9         |          2.6           |            2.7            |
|  2.3  |       2.8        |         2.9         |          2.6           |            2.8            |
|  2.4  |       2.9        |         3.0         |          2.7           |            2.9            |
|  2.5  |       3.0        |         3.1         |          2.8           |            3.0            |
|  2.6  |       3.1        |         3.2         |          2.9           |            3.1            |
|  2.7  |       3.2        |         3.3         |          3.0           |            3.2            |
|  2.8  |       3.3        |         3.3         |          3.1           |            3.3            |
|  2.9  |       3.3        |         3.4         |          3.2           |            3.4            |
|   3   |       3.4        |         3.5         |          3.3           |            3.4            |
|  3.1  |       3.5        |         3.6         |          3.4           |            3.5            |
|  3.2  |       3.6        |         3.7         |          3.5           |            3.6            |
|  3.3  |       3.7        |         3.7         |          3.5           |            3.7            |
|  3.4  |       3.8        |         3.8         |          3.6           |            3.8            |
|  3.5  |       3.8        |         3.9         |          3.7           |            3.9            |
|  3.6  |       3.9        |         4.0         |          3.8           |            3.9            |
|  3.7  |       4.0        |         4.1         |          3.9           |            4.1            |
|  3.8  |       4.1        |         4.1         |          4.0           |            4.2            |
|  3.9  |       4.2        |         4.2         |          4.1           |            4.3            |
|   4   |       4.3        |         4.3         |          4.2           |            4.3            |
|  5.7  |       5.7        |         5.7         |          5.7           |            5.8            |
|  5.8  |       5.8        |         5.8         |          5.8           |            5.9            |
|  5.9  |       5.9        |         5.9         |          5.9           |            6.0            |
|   6   |       6.0        |         6.0         |          6.0           |            6.1            |

##### Menuiserie métallique sans rupture de pont thermique

|  Ug   | Fenêtre battante | Fenêtre coulissante | Porte-Fenêtre battante | Porte-Fenêtre coulissante |
| :---: | :--------------: | :-----------------: | :--------------------: | :-----------------------: |
|  0.5  |       1.9        |         2.2         |          1.4           |            1.5            |
|  0.6  |       2.0        |         2.3         |          1.5           |            1.6            |
|  0.7  |       2.1        |         2.4         |          1.6           |            1.7            |
|  0.8  |       2.2        |         2.4         |          1.7           |            1.8            |
|  0.9  |       2.2        |         2.5         |          1.8           |            1.9            |
|   1   |       2.3        |         2.6         |          1.9           |            1.9            |
|  1.1  |       2.4        |         2.7         |          2.0           |            2.0            |
|  1.2  |       2.5        |         2.8         |          2.1           |            2.1            |
|  1.3  |       2.6        |         2.8         |          2.1           |            2.2            |
|  1.4  |       2.7        |         2.9         |          2.2           |            2.3            |
|  1.5  |       2.7        |         3.0         |          2.3           |            2.4            |
|  1.6  |       2.8        |         3.1         |          2.4           |            2.5            |
|  1.7  |       2.9        |         3.2         |          2.5           |            2.6            |
|  1.8  |       3.0        |         3.2         |          2.6           |            2.7            |
|  1.9  |       3.1        |         3.3         |          2.7           |            2.8            |
|   2   |       3.2        |         3.4         |          2.8           |            2.8            |
|  2.1  |       3.3        |         3.5         |          2.9           |            2.9            |
|  2.2  |       3.3        |         3.6         |          3.0           |            3.0            |
|  2.3  |       3.4        |         3.6         |          3.0           |            3.1            |
|  2.4  |       3.5        |         3.7         |          3.1           |            3.2            |
|  2.5  |       3.6        |         3.8         |          3.2           |            3.3            |
|  2.6  |       3.7        |         3.9         |          3.3           |            3.4            |
|  2.7  |       3.8        |         4.0         |          3.4           |            3.5            |
|  2.8  |       3.9        |         4.0         |          3.5           |            3.6            |
|  2.9  |       3.9        |         4.1         |          3.6           |            3.7            |
|   3   |       4.0        |         4.2         |          3.7           |            3.7            |
|  3.1  |       4.1        |         4.3         |          3.8           |            3.8            |
|  3.2  |       4.2        |         4.4         |          3.9           |            3.9            |
|  3.3  |       4.3        |         4.4         |          3.9           |            4.0            |
|  3.4  |       4.4        |         4.5         |          4.0           |            4.1            |
|  3.5  |       4.4        |         4.6         |          4.1           |            4.2            |
|  3.6  |       4.5        |         4.7         |          4.2           |            4.3            |
|  3.7  |       4.6        |         4.8         |          4.3           |            4.4            |
|  3.8  |       4.7        |         4.8         |          4.4           |            4.5            |
|  3.9  |       4.8        |         4.9         |          4.5           |            4.6            |
|   4   |       4.9        |         5.0         |          4.6           |            4.6            |
|  5.7  |       6.3        |         6.4         |          6.1           |            6.2            |
|  5.8  |       6.4        |         6.4         |          6.2           |            6.3            |
|  5.9  |       6.5        |         6.5         |          6.3           |            6.4            |
|   6   |       6.6        |         6.6         |          6.4           |            6.4            |

##### Menuiserie PVC

|  Ug   | Fenêtre battante | Fenêtre coulissante | Porte-Fenêtre battante | Porte-Fenêtre coulissante | Porte-Fenêtre battante avec soubassement |
| :---: | :--------------: | :-----------------: | :--------------------: | :-----------------------: | :--------------------------------------: |
|  0.5  |       0.9        |         1.3         |          0.8           |            1.1            |                   0.9                    |
|  0.6  |       1.0        |         1.4         |          0.9           |            1.2            |                   1.0                    |
|  0.7  |       1.1        |         1.5         |          1.0           |            1.2            |                   1.1                    |
|  0.8  |       1.2        |         1.5         |          1.0           |            1.3            |                   1.1                    |
|  0.9  |       1.2        |         1.6         |          1.1           |            1.4            |                   1.2                    |
|   1   |       1.3        |         1.7         |          1.2           |            1.5            |                   1.3                    |
|  1.1  |       1.4        |         1.7         |          1.3           |            1.6            |                   1.4                    |
|  1.2  |       1.5        |         1.8         |          1.4           |            1.6            |                   1.4                    |
|  1.3  |       1.5        |         1.9         |          1.4           |            1.7            |                   1.5                    |
|  1.4  |       1.6        |         2.0         |          1.5           |            1.8            |                   1.6                    |
|  1.5  |       1.7        |         2.0         |          1.6           |            1.9            |                   1.6                    |
|  1.6  |       1.8        |         2.1         |          1.7           |            2.0            |                   1.7                    |
|  1.7  |       1.8        |         2.2         |          1.8           |            2.0            |                   1.8                    |
|  1.8  |       1.9        |         2.2         |          1.8           |            2.1            |                   1.8                    |
|  1.9  |       2.0        |         2.3         |          1.9           |            2.2            |                   1.9                    |
|   2   |       2.1        |         2.4         |          2.0           |            2.3            |                   2.0                    |
|  2.1  |       2.1        |         2.4         |          2.1           |            2.4            |                   2.1                    |
|  2.2  |       2.2        |         2.5         |          2.2           |            2.4            |                   2.1                    |
|  2.3  |       2.3        |         2.6         |          2.2           |            2.5            |                   2.2                    |
|  2.4  |       2.4        |         2.7         |          2.3           |            2.6            |                   2.3                    |
|  2.5  |       2.4        |         2.7         |          2.4           |            2.7            |                   2.3                    |
|  2.6  |       2.5        |         2.8         |          2.5           |            2.8            |                   2.4                    |
|  2.7  |       2.6        |         2.9         |          2.6           |            2.8            |                   2.5                    |
|  2.8  |       2.7        |         2.9         |          2.6           |            2.9            |                   2.5                    |
|  2.9  |       2.7        |         3.0         |          2.7           |            3.0            |                   2.6                    |
|   3   |       2.8        |         3.1         |          2.8           |            3.1            |                   2.7                    |
|  3.1  |       2.9        |         3.1         |          2.9           |            3.2            |                   2.8                    |
|  3.2  |       3.0        |         3.2         |          3.0           |            3.2            |                   2.8                    |
|  3.3  |       3.0        |         3.3         |          3.0           |            3.3            |                   2.9                    |
|  3.4  |       3.1        |         3.4         |          3.1           |            3.4            |                   3.0                    |
|  3.5  |       3.2        |         3.4         |          3.2           |            3.5            |                   3.0                    |
|  3.6  |       3.3        |         3.5         |          3.3           |            3.6            |                   3.1                    |
|  3.7  |       3.3        |         3.6         |          3.4           |            3.6            |                   3.2                    |
|  3.8  |       3.4        |         3.6         |          3.4           |            3.7            |                   3.2                    |
|  3.9  |       3.5        |         3.7         |          3.5           |            3.8            |                   3.3                    |
|   4   |       3.6        |         3.8         |          3.6           |            3.9            |                   3.4                    |
|  5.7  |       4.8        |         5.0         |          5.0           |            5.2            |                   4.6                    |
|  5.8  |       4.9        |         5.0         |          5.0           |            5.3            |                   4.6                    |
|  5.9  |       5.0        |         5.1         |          5.1           |            5.4            |                   4.7                    |
|   6   |       5.1        |         5.2         |          5.2           |            5.5            |                   4.8                    |

##### Menuiserie bois ou bois métal

Dans tous les calculs, les menuiseries mixtes bois métal prendront les caractéristiques du bois.

|  Ug   | Fenêtre battante | Fenêtre coulissante | Porte-Fenêtre battante | Porte-Fenêtre coulissante | Porte-Fenêtre battante avec soubassement |
| :---: | :--------------: | :-----------------: | :--------------------: | :-----------------------: | :--------------------------------------: |
|  0.5  |       1.1        |         1.2         |          0.9           |            1.0            |                   1.1                    |
|  0.6  |       1.2        |         1.3         |          1.0           |            1.1            |                   1.2                    |
|  0.7  |       1.3        |         1.4         |          1.1           |            1.2            |                   1.2                    |
|  0.8  |       1.4        |         1.4         |          1.2           |            1.2            |                   1.3                    |
|  0.9  |       1.4        |         1.5         |          1.2           |            1.3            |                   1.4                    |
|   1   |       1.5        |         1.6         |          1.3           |            1.4            |                   1.4                    |
|  1.1  |       1.6        |         1.7         |          1.4           |            1.5            |                   1.5                    |
|  1.2  |       1.7        |         1.8         |          1.5           |            1.6            |                   1.6                    |
|  1.3  |       1.8        |         1.9         |          1.6           |            1.7            |                   1.7                    |
|  1.4  |       1.8        |         2.0         |          1.7           |            1.7            |                   1.7                    |
|  1.5  |       1.9        |         2.1         |          1.8           |            1.8            |                   1.8                    |
|  1.6  |       2.0        |         2.1         |          1.8           |            1.9            |                   1.9                    |
|  1.7  |       2.1        |         2.2         |          1.9           |            2.0            |                   1.9                    |
|  1.8  |       2.2        |         2.3         |          2.0           |            2.1            |                   2.0                    |
|  1.9  |       2.2        |         2.4         |          2.1           |            2.2            |                   2.1                    |
|   2   |       2.3        |         2.4         |          2.2           |            2.3            |                   2.1                    |
|  2.1  |       2.4        |         2.5         |          2.3           |            2.3            |                   2.2                    |
|  2.2  |       2.5        |         2.6         |          2.3           |            2.4            |                   2.3                    |
|  2.3  |       2.6        |         2.7         |          2.4           |            2.5            |                   2.4                    |
|  2.4  |       2.6        |         2.7         |          2.5           |            2.6            |                   2.4                    |
|  2.5  |       2.7        |         2.8         |          2.6           |            2.7            |                   2.5                    |
|  2.6  |       2.8        |         2.9         |          2.7           |            2.8            |                   2.6                    |
|  2.7  |       2.9        |         3.0         |          2.8           |            2.9            |                   2.6                    |
|  2.8  |       3.0        |         3.0         |          2.9           |            2.9            |                   2.7                    |
|  2.9  |       3.0        |         3.1         |          2.9           |            3.0            |                   2.8                    |
|   3   |       3.1        |         3.2         |          3.0           |            3.1            |                   2.8                    |
|  3.1  |       3.2        |         3.3         |          3.1           |            3.2            |                   2.9                    |
|  3.2  |       3.3        |         3.3         |          3.2           |            3.3            |                   3.0                    |
|  3.3  |       3.4        |         3.4         |          3.3           |            3.4            |                   3.1                    |
|  3.4  |       3.4        |         3.5         |          3.4           |            3.4            |                   3.1                    |
|  3.5  |       3.5        |         3.6         |          3.5           |            3.5            |                   3.2                    |
|  3.6  |       3.6        |         3.6         |          3.5           |            3.6            |                   3.3                    |
|  3.7  |       3.7        |         3.7         |          3.6           |            3.7            |                   3.3                    |
|  3.8  |       3.8        |         3.8         |          3.7           |            3.8            |                   3.4                    |
|  3.9  |       3.8        |         3.9         |          3.8           |            3.9            |                   3.5                    |
|   4   |       3.9        |         3.9         |          3.9           |            4.0            |                   3.5                    |
|  5.7  |       5.3        |         5.3         |          5.3           |            5.4            |                   4.7                    |
|  5.8  |       5.4        |         5.4         |          5.4           |            5.5            |                   4.8                    |
|  5.9  |       5.4        |         5.4         |          5.5           |            5.6            |                   4.9                    |
|   6   |       5.5        |         5.5         |          5.6           |            5.7            |                   4.9                    |

##### Traitement des doubles fenêtres

$$Uw = \frac{1}{\frac{1}{Uw1}} + \frac{1}{Uw2 + 0.07}$$

Uw1 et Uw2 sont respectivement le coefficient de transmission thermique des fenêtres 1 et 2 (W/(m².K)).

Chaque fenêtre du complexe doit donc être caractérisée pour déterminer la performance de la double fenêtre.

Si le Uw d'une menuiserie est connu et justifié, le saisir directement.

#### 3.3.3 Coefficients Ujn des fenêtres/portes-fenêtres

La présence de volets aux fenêtres et portes-fenêtres leur apporte un supplément d'isolation avec une résistance additionnelle ΔR.

| Fermetures                                                                                                                                       | ΔR (m².K/W) |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | :---------: |
| Jalousie accordéon, fermeture à lames orientables y compris les vénitiens extérieurs tout métal, volets battants ou persiennes avec ajours fixes |    0.08     |
| Fermeture sans ajours en position déployée, volets roulants alu                                                                                  |    0.15     |
| Volets roulants PVC ou bois (e ≤ 12 mm)                                                                                                          |    0.19     |
| Persienne coulissante et volet battant PVC ou bois (e ≤ 22 mm)                                                                                   |    0.19     |
| Volets roulants PVC ou bois (e > 12 mm)                                                                                                          |    0.25     |
| Persienne coulissante et volet battant PVC ou bois (e > 22 mm)                                                                                   |    0.25     |
| Fermeture isolée sans ajours en position déployée                                                                                                |    0.25     |

Note : e est l'épaisseur du tablier.

Dans la suite, les Ujn associés à des Uw non présents dans les tableaux peuvent être obtenus par interpolation ou extrapolation avec les deux Uw tabulés les plus proches.

**Ujn pour une valeur de résistance supplémentaire ΔR (en m².K/W) :**

| Uw W/(m².K) | ΔR = 0.08 | ΔR = 0.15 | ΔR = 0.19 | ΔR = 0.25 |
| :---------: | :-------: | :-------: | :-------: | :-------: |
|     0.8     |    0.8    |    0.8    |    0.7    |    0.7    |
|     0.9     |    0.9    |    0.8    |    0.8    |    0.8    |
|      1      |    1.0    |    0.9    |    0.9    |    0.9    |
|     1.1     |    1.1    |    1.0    |    1.0    |    1.0    |
|     1.2     |    1.1    |    1.1    |    1.1    |    1.1    |
|     1.3     |    1.2    |    1.2    |    1.2    |    1.1    |
|     1.4     |    1.3    |    1.3    |    1.3    |    1.2    |
|     1.5     |    1.4    |    1.4    |    1.3    |    1.3    |
|     1.6     |    1.5    |    1.5    |    1.4    |    1.4    |
|     1.7     |    1.6    |    1.5    |    1.5    |    1.4    |
|     1.8     |    1.7    |    1.6    |    1.6    |    1.5    |
|     1.9     |    1.8    |    1.7    |    1.6    |    1.6    |
|      2      |    1.9    |    1.8    |    1.7    |    1.7    |
|     2.1     |    1.9    |    1.9    |    1.8    |    1.7    |
|     2.2     |    2.0    |    1.9    |    1.9    |    1.8    |
|     2.3     |    2.1    |    2.0    |    2.0    |    1.9    |
|     2.4     |    2.2    |    2.1    |    2.0    |    2.0    |
|     2.5     |    2.3    |    2.2    |    2.1    |    2.0    |
|     2.6     |    2.4    |    2.3    |    2.2    |    2.1    |
|     2.7     |    2.5    |    2.3    |    2.2    |    2.2    |
|     2.8     |    2.5    |    2.4    |    2.3    |    2.2    |
|     2.9     |    2.6    |    2.5    |    2.4    |    2.3    |
|      3      |    2.7    |    2.6    |    2.5    |    2.4    |
|     3.1     |    2.8    |    2.6    |    2.5    |    2.4    |
|     3.2     |    2.9    |    2.7    |    2.6    |    2.5    |
|     3.3     |    3.0    |    2.8    |    2.7    |    2.6    |
|     3.4     |    3.0    |    2.9    |    2.7    |    2.6    |
|     3.5     |    3.1    |    2.9    |    2.8    |    2.7    |
|     3.6     |    3.2    |    3.0    |    2.9    |    2.7    |
|     3.7     |    3.3    |    3.1    |    2.9    |    2.8    |
|     3.8     |    3.4    |    3.1    |    3.0    |    2.9    |
|     3.9     |    3.4    |    3.2    |    3.1    |    2.9    |
|      4      |    3.5    |    3.3    |    3.1    |    3.0    |
|     4.1     |    3.6    |    3.4    |    3.2    |    3.1    |
|     4.2     |    3.7    |    3.4    |    3.3    |    3.1    |
|     4.3     |    3.7    |    3.5    |    3.3    |    3.2    |
|     4.4     |    3.8    |    3.6    |    3.4    |    3.2    |
|     4.5     |    3.9    |    3.6    |    3.5    |    3.3    |
|     4.6     |    4.0    |    3.7    |    3.5    |    3.4    |
|     4.7     |    4.1    |    3.8    |    3.6    |    3.4    |
|     4.8     |    4.1    |    3.8    |    3.7    |    3.5    |
|     4.9     |    4.2    |    3.9    |    3.7    |    3.6    |
|      5      |    4.3    |    4.0    |    3.8    |    3.6    |
|     5.1     |    4.4    |    4.0    |    3.8    |    3.7    |
|     5.2     |    4.4    |    4.1    |    3.9    |    3.7    |
|     5.3     |    4.5    |    4.2    |    4.0    |    3.8    |
|     5.4     |    4.6    |    4.2    |    4.0    |    3.8    |
|     5.5     |    4.7    |    4.3    |    4.1    |    3.9    |
|     5.6     |    4.7    |    4.4    |    4.2    |    4.0    |
|     5.7     |    4.8    |    4.4    |    4.2    |    4.0    |
|     5.8     |    4.9    |    4.5    |    4.3    |    4.1    |
|     5.9     |    5.0    |    4.6    |    4.3    |    4.1    |
|      6      |    5.0    |    4.6    |    4.4    |    4.2    |
|     6.1     |    5.1    |    4.7    |    4.5    |    4.3    |
|     6.2     |    5.2    |    4.8    |    4.5    |    4.3    |
|     6.3     |    5.2    |    4.8    |    4.6    |    4.4    |
|     6.4     |    5.3    |    4.9    |    4.6    |    4.4    |
|     6.5     |    5.4    |    5.0    |    4.7    |    4.5    |
|     6.6     |    5.5    |    5.0    |    4.8    |    4.5    |

Si le Ujn d'une menuiserie est connu et justifié, le saisir directement.

#### 3.3.4 Coefficients U des portes

Si le coefficient U des portes est connu et justifié, le saisir directement. Sinon, prendre les valeurs tabulées ci-dessous :

|   Nature de la menuiserie   |               Type de porte               | Uporte W/(m².K) |
| :-------------------------: | :---------------------------------------: | :-------------: |
| Porte simple en bois ou PVC |            Porte opaque pleine            |       3.5       |
| Porte simple en bois ou PVC | Porte avec moins de 30% de vitrage simple |        4        |
| Porte simple en bois ou PVC |    Porte avec 30-60% de vitrage simple    |       4.5       |
| Porte simple en bois ou PVC |         Porte avec double vitrage         |       3.3       |
|    Porte simple en métal    |            Porte opaque pleine            |       5.8       |
|    Porte simple en métal    |         Porte avec vitrage simple         |       5.8       |
|    Porte simple en métal    | Porte avec moins de 30% de double vitrage |       5.5       |
|    Porte simple en métal    |    Porte avec 30-60% de double vitrage    |       4.8       |
|      Toute menuiserie       |        Porte opaque pleine isolée         |       1.5       |
|      Toute menuiserie       |          Porte précédée d'un SAS          |       1.5       |
|      Toute menuiserie       |     Porte isolée avec double vitrage      |       1.5       |

Attention : une porte vitrée avec plus de 60% de vitrage est traitée comme une porte-fenêtre avec soubassement.

### 3.4 Calcul des déperditions par les ponts thermiques

---

**Données d'entrée :**

- Type d'isolation (ITI, ITE, ITR)
- Nombre de niveaux
- Nombre d'appartements
- Retour d'isolation autour des menuiseries (avec ou sans)
- Hauteur moyenne sous plafond
- Linéaires de pont thermique
- Position des menuiseries (nu extérieur, nu intérieur, tunnel)

---

$$PT = \sum_{i,j} k_{pb\_i/m\_j} \cdot l_{pb\_i/m\_j} + \sum_{i,j} k_{pi\_i/m\_j} \cdot l_{pi\_i/m\_j} + \sum_{j} k_{rf/m\_j} \cdot l_{rf/m\_j} + \sum_{i,j} k_{ph\_i/m\_j} \cdot l_{ph\_i/m\_j} + \sum_{i,j} k_{men\_i/m\_j} \cdot l_{men\_i/m\_j}$$

**Avec :**

- $k_{pb_i/m\_j}$ : valeur du pont thermique de la liaison plancher bas i / mur j (W/(m·K))
- $k_{pi\_i/m\_j}$ : valeur du pont thermique de la liaison plancher intermédiaire i / mur j (W/(m·K))
- $k_{rf/m\_j}$ : valeur du pont thermique de la liaison refend / mur j (W/(m·K))
- $k_{ph\_i/m\_j}$ : valeur du pont thermique de la liaison plancher haut i / mur j (W/(m·K))
- $k_{men\_i/m\_j}$ : valeur du pont thermique de la liaison menuiserie i / mur j (W/(m·K))
- $l_{pb\_i/m\_j}$ : longueur du pont thermique plancher bas i / mur j (m) — prend en compte les seuils des portes et portes-fenêtres
- $l_{pi_i/m\_j}$ : longueur du pont thermique plancher intermédiaire i / mur j (m)
- $l_{ph_i/m\_j}$ : longueur du pont thermique plancher haut i / mur j (m)
- $l_{rf/m\_j}$ : longueur du pont thermique refend / mur j (m)

En immeuble collectif d'habitation, la longueur totale forfaitaire du pont thermique refend/mur est :

$$l_{rf/m\_j} = 2 \cdot H_{sp} \cdot (Nb_{lgt} - Niv)$$

Avec :

- $H_{sp}$ : hauteur moyenne sous plafond
- $Nb_{lgt}$$ : nombre d'appartements
- $Niv$ : nombre de niveaux de logements

- $l_{men\_i/m\_j}$ : longueur du pont thermique menuiserie i / mur j (m)
- ITI, ITE, ITR : respectivement isolation thermique intérieure, extérieure et répartie.

**Si l'état d'isolation d'une paroi est inconnu :**

- Pour les bâtiments d'avant 1975, la paroi est considérée comme **non isolée**.
- Pour les bâtiments construits **à partir de 1975** :
  - Les murs sont considérés comme isolés par l'intérieur (ITI) ;
  - Les plafonds sont considérés isolés par l'extérieur (ITE) ;
  - Les planchers sur terre-plein sont considérés non isolés avant 2001, et isolés par l'extérieur (en sous-face) à partir de 2001 ;
  - Les autres planchers sont considérés isolés par l'extérieur (ITE).

Dans la suite, les murs en ossature bois sont traités comme des murs à isolation répartie.

Si les valeurs des ponts thermiques sont connues et justifiées, les saisir directement pour le calcul, à l'exception des ponts thermiques négligés dans les valeurs par défaut. Sinon, les valeurs par défaut proposées ci-après peuvent être utilisées.

Les ponts thermiques des parois au niveau des circulations communes ne sont pas pris en compte.

Aucun coefficient de réduction des températures (b) n'est appliqué aux ponts thermiques.

Seuls les ponts thermiques entre parois lourdes ou entre une paroi et une menuiserie sont conservés.

#### 3.4.1 Plancher bas / mur

$k_{pb\_i/m\_j}$ : Valeur du pont thermique de la liaison Plancher bas i / Mur j (W/(m·K))

| **Mur extérieur** | **Plancher bas — Non isolé** | **Plancher bas — ITI** | **Plancher bas — ITE** | **Plancher bas — ITI + ITE** |
| :---------------: | :--------------------------: | :--------------------: | :--------------------: | :--------------------------: |
|     Non isolé     |             0.39             |          0.47          |          0.8           |             0.47             |
|        ITI        |             0.31             |          0.08          |          0.71          |             0.08             |
|        ITE        |             0.49             |          0.48          |          0.64          |             0.48             |
|        ITR        |             0.35             |          0.1           |          0.45          |             0.1              |
|     ITI + ITE     |             0.31             |          0.08          |          0.45          |             0.08             |
|     ITI + ITR     |             0.31             |          0.08          |          0.45          |             0.08             |
|     ITE + ITR     |             0.35             |          0.1           |          0.45          |             0.1              |

Seuls les murs et planchers bas constitués d'un matériau lourd (béton, brique, …) sont considérés ici. Pour les autres cas, ce pont thermique est pris nul.

- Pour les **murs**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITI**.
- Pour les **planchers bas**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITE**.
- Pour un plancher bas, ITI correspond à une isolation sous chape et ITE à une isolation en sous-face.
- Les planchers en hourdis polystyrène sont traités comme des planchers avec ITE.

#### 3.4.2 Plancher intermédiaire / mur

$k_{pi\_i/m\_j}$ : Valeur du pont thermique de la liaison Plancher intermédiaire i / Mur j (W/(m·K))

| **Mur extérieur** | $k_{pi}$ |
| :---------------: | :------: |
|     Non isolé     |   0.86   |
|        ITI        |   0.92   |
|        ITE        |   0.13   |
|        ITR        |   0.24   |
|     ITI + ITE     |   0.13   |
|     ITI + ITR     |   0.24   |
|     ITE + ITR     |   0.13   |

Seuls les murs et planchers constitués d'un matériau lourd (béton, brique, …) sont considérés ici. Pour les autres cas, ce pont thermique est pris nul.

- Pour les **murs**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITI**.
- Les ponts thermiques des planchers intermédiaires en structure légère (ossature bois ou autre matériau) / murs sont **négligés**.
- Lorsque le plancher intermédiaire ne sépare pas deux niveaux du lot faisant l'objet du DPE, prendre en compte seulement la **moitié** de la valeur tabulée.

#### 3.4.3 Plancher haut / mur

$k_{ph\_i/m\_j}$ : Valeur du pont thermique de la liaison Plancher haut i / Mur j (W/(m·K))

*Terrasse ou plancher haut lourd :*

| **Mur extérieur** | **Plancher haut — Non isolé** | **Plancher haut — ITI** | **Plancher haut — ITE** | **Plancher haut — ITI + ITE** |
| :---------------: | :---------------------------: | :---------------------: | :---------------------: | :---------------------------: |
|   **Non isolé**   |              0.3              |          0.83           |           0.4           |              0.4              |
|      **ITI**      |             0.27              |          0.07           |          0.75           |             0.07              |
|      **ITE**      |             0.55              |          0.76           |          0.58           |             0.58              |
|      **ITR**      |              0.4              |           0.3           |          0.48           |              0.3              |
|   **ITI + ITE**   |             0.27              |          0.07           |          0.58           |             0.07              |
|   **ITI + ITR**   |             0.27              |          0.07           |          0.48           |             0.07              |
|   **ITE + ITR**   |              0.4              |           0.3           |          0.48           |              0.3              |

- Pour les **murs**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITI**.
- Pour les **planchers hauts**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITE**.
- Pour un plancher haut, ITI correspond à une isolation sous plancher haut et ITE à une isolation sur plancher haut.
- Les ponts thermiques des planchers hauts en structure légère sont **négligés**.

#### 3.4.4 Refend / mur

$k_{rf/m\_j}$ : Valeur du pont thermique de la liaison Refend / Mur j (W/(m·K))

| **Mur extérieur** | $k_{rf}$ |
| :---------------: | :------: |
|     Non isolé     |   0.73   |
|        ITI        |   0.82   |
|        ITE        |   0.13   |
|        ITR        |   0.2    |
|     ITI + ITE     |   0.13   |
|     ITI + ITR     |   0.2    |
|     ITE + ITR     |   0.13   |

Seuls les murs et refends constitués d'un matériau lourd (béton, brique, …) sont considérés ici. Pour les autres cas, ce pont thermique est pris nul.

- Pour les **murs**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITI**.
- Les ponts thermiques des parois sur circulation sont **négligés** pour les appartements et les immeubles.
- Lorsque le refend ne sépare pas deux volumes du même lot faisant l'objet du DPE, prendre en compte seulement la **moitié** de la valeur tabulée.

#### 3.4.5 Menuiserie / mur

$k_{men\_i/m\_j}$ : Valeur du pont thermique de la liaison Menuiserie i / Mur j (W/(m·K))

> On entend par menuiserie les fenêtres, portes ou portes-fenêtres.

|         **Mur extérieur**         | **Nu extérieur Lp=5** | **Nu extérieur Lp=10** | **Tunnel Lp=5** | **Tunnel Lp=10** | **Nu intérieur Lp=5** | **Nu intérieur Lp=10** |
| :-------------------------------: | :-------------------: | :--------------------: | :-------------: | :--------------: | :-------------------: | :--------------------: |
|           **Non isolé**           |         0.43          |          0.29          |      0.31       |       0.19       |         0.38          |          0.25          |
|   **ITI avec retour d'isolant**   |         0.22          |          0.18          |      0.16       |       0.13       |           0           |           0            |
|   **ITI sans retour d'isolant**   |         0.43          |          0.29          |      0.31       |       0.19       |           0           |           0            |
|   **ITE avec retour d'isolant**   |           0           |           0            |      0.19       |       0.15       |         0.25          |          0.2           |
|   **ITE sans retour d'isolant**   |           0           |           0            |      0.45       |       0.4        |          0.9          |          0.8           |
|              **ITR**              |          0.2          |           —            |        —        |        —         |           —           |           —            |
| **ITI+ITE avec retour d'isolant** |           0           |           0            |      0.16       |       0.13       |           0           |           0            |
| **ITI+ITE sans retour d'isolant** |           0           |           0            |      0.31       |       0.19       |           0           |           0            |
| **ITI+ITR avec retour d'isolant** |          0.2          |          0.18          |      0.16       |       0.13       |           0           |           0            |
| **ITI+ITR sans retour d'isolant** |          0.2          |          0.2           |       0.2       |       0.19       |           0           |           0            |
| **ITE+ITR avec retour d'isolant** |           0           |           0            |      0.19       |       0.15       |          0.2          |          0.2           |
| **ITE+ITR sans retour d'isolant** |           0           |           0            |       0.2       |       0.2        |          0.2          |          0.2           |

Avec :

- **Lp** : largeur approximative (arrondie à la valeur la plus proche apparaissant dans le tableau) du dormant de la menuiserie (cm). En cas de double-fenêtre, la largeur du dormant est la plus importante des deux.

- Pour les **murs**, s'il n'est pas possible de distinguer le type d'isolation, prendre par défaut **ITI**.
- Ces valeurs de pont thermique sont valables pour les appuis, tableaux et le linteau de la menuiserie.
- Les ponts thermiques au niveau des **seuils de porte et de porte-fenêtre** ne sont pas pris en compte.
- Les ponts thermiques avec les parois en structure bois (ossature bois, rondin de bois, pans de bois) sont **négligés**.
- Les ponts thermiques au niveau des **fenêtres de toit** sont négligés.
- Les ponts thermiques pour la liaison mur / pavés de verre, plancher pavés de verre et plafond pavés de verre ne sont **pas pris en compte**.
