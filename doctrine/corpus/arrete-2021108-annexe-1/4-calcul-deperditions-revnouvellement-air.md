## 4 Calcul des déperditions par renouvellement d'air

---

**Données d'entrée :**

- Type de bâtiment
- Surface des parois déperditives hors plancher bas
- Surface habitable
- Nombre de niveaux
- Hauteur moyenne sous plafond
- Type de ventilation
- Année de construction ou de l'installation
- Zone climatique

---

Les déperditions DR par renouvellement d'air par degré d'écart entre l'intérieur et l'extérieur (W/K) sont données par la formule suivante :

$$DR = Hvent + Hperm$$

Avec :

- $Hvent$ : déperdition thermique par renouvellement d'air due au système de ventilation par degré d'écart entre l'intérieur et l'extérieur (W/K)
- $Hperm$ : déperdition thermique par renouvellement d'air due au vent par degré d'écart entre l'intérieur et l'extérieur (W/K)

$$Hvent= 0.34 ∗ Qvarep_{conv} * Sh$$

- $Qvarep_{conv}$ : débit d'air extrait conventionnel par unité de surface habitable (m3 /(h.m²)) (voir tableau par type de ventilation ci-après)
- $Sh$ : surface habitable (m²)
- 0.34 : chaleur volumique de l'air (Wh/(m3 .K))

$$Hperm= 0.34 ∗ Qvinf$$

- Qvinf : débit d'air dû aux infiltrations liées au vent (m3 /h)

$$Qvinf = \frac{Hsp ∗ Sh ∗ n_{50} ∗ 𝑒}{1 + \frac{𝑓}{𝑒} ∗ (\frac{Qvasouf_{conv} - Qvarep_{conv}}{Hsp ∗ n_{50}}) ^ 2}$$

- $Hsp$ : hauteur moyenne sous plafond (m)
- $Sh$ : surface habitable (m²)
- $Qvasouf_{conv}$ : débit volumique conventionnel à souffler (m3/(h.m²)) (voir tableau par type de ventilation ci-après)
- $Qvarep_{conv}$ : débit volumique conventionnel à reprendre (m3/(h.m²)) (voir tableau par type de ventilation ci-après)
- e et f sont des coefficients de protection prenant les valeurs tabulées ci-dessous :

| Coefficient | lusieurs façades exposées | Une seule façade exposée |
| :---------: | :-----------------------: | :----------------------: |
|      e      |           0.07            |           0.02           |
|      f      |            15             |            20            |

- $n50$ : Renouvellement d'air sous 50 Pascals (h-^1 )

$$n_{50} = \frac{Q_{4pa}}{\frac{4}{50} ^ \frac{2}{3} * Hsp * Sh}$$

- $Q_{4pa}$ : perméabilité sous 4 Pa de la zone (m3 /h)

$$Q_{4pa}= Q_{4paenv} + 0.45 ∗ Smea_{conv} ∗ Sh$$

- $Smea_{conv}$ : somme des modules d'entrée d'air sous 20 Pa par unité de surface habitable (m3 /(h.m²)) (voir tableau par type de ventilation ci-après)
- $Q_{4paenv}$ : perméabilité de l'enveloppe (m3 /h) :

$$Q_{4paenv}= Q_{4paconv/m²} ∗ Sdep$$

- $Sdep$ : surface des parois déperditives hors plancher bas (m²)
- $Q_{4paconv/m²}$: valeur conventionnelle de la perméabilité sous 4Pa (m3 /(h.m²)) :

**Appartement / Immeuble :**

|    Type de logement    | Période de construction | $Q_{4paconv/m²}$ |
| :--------------------: | :---------------------: | :--------------: |
| Appartement / Immeuble |       Avant 1948        |       4.6        |
| Appartement / Immeuble |       1948 - 1974       |        2         |
| Appartement / Immeuble |       1975 - 2012       |       1.5        |
| Appartement / Immeuble |         > 2012          |        1         |
|         Maison         |       Avant 1948        |       3.3        |
|         Maison         |       1948 - 1974       |       2.2        |
|         Maison         |       1975 - 2012       |       1.9        |
|         Maison         |         > 2012          |       1.3        |

Pour les bâtiments qui ont fait l'objet d'une mesure d'étanchéité à l'air moins de deux ans avant le diagnostic, la valeur mesurée de $Q_{4paconv/m²}$ peut être saisie.

Pour les bâtiments ou logements construits avant 194 8 avec une isolation des murs et/ou du plafond (isolation de plus de 50% des surfaces), $Q_{4paconv/m²}$ = 2 m3/(h.m²)

Pour les bâtiments ou logements construits entre 194 8 et 1974 avec une isolation des murs et/ou du plafond (isolation de plus de 50% des surfaces), $Q_{4paconv/m²}$ = 1,9 m3 /(h.m²)

Pour les bâtiments ou logements construits avant 1948 et dont les menuiseries possèdent des joints, $Q_{4paconv/m²}$ = 2,5 m3 /(h.m²). On considère cette condition respectée si les menuiseries représentant plus de 50% de la surface totale possèdent des joints.

| Type de ventilation                                        | $Qvarep_{conv}$ | $Qvasouf_{conv}$ | $Smea_{conv}$ |
| ---------------------------------------------------------- | :-------------: | :--------------: | :-----------: |
| Ventilation par ouverture des fenêtres                     |       1.2       |       1.2        |       0       |
| Ventilation par entrées d'air hautes et basses             |      2.23       |        0         |       4       |
| VMC SF Auto réglable < 1982                                |      1.97       |        0         |       2       |
| VMC SF Auto réglable de 1982 à 2000                        |      1.65       |        0         |       2       |
| VMC SF Auto réglable de 2001 à 2012                        |       1.5       |        0         |       2       |
| VMC SF Auto réglable après 2012                            |      1.32       |        0         |       2       |
| VMC SF Hygro A < 2001                                      |       1.5       |        0         |       2       |
| VMC SF Hygro A de 2001 à 2012                              |      1.44       |        0         |       2       |
| VMC SF Hygro A après 2012                                  |      1.16       |        0         |       2       |
| VMC SF Gaz < 2001                                          |      1.59       |        0         |       2       |
| VMC SF Gaz de 2001 à 2012                                  |      1.53       |        0         |       2       |
| VMC SF Gaz après 2012                                      |      1.22       |        0         |       2       |
| VMC SF Hygro B < 2001                                      |      1.36       |        0         |      1.5      |
| VMC SF Hygro B de 2001 à 2012                              |      1.24       |        0         |      1.5      |
| VMC SF Hygro B après 2012                                  |      1.09       |        0         |      1.5      |
| VMC Basse pression Auto-réglable                           |      1.97       |        0         |       2       |
| VMC Basse pression Hygro A                                 |       1.3       |        0         |       2       |
| VMC Basse pression Hygro B                                 |      1.24       |        0         |      1.5      |
| VMC DF individuelle avec échangeur ≤ 2012                  |       0.6       |       0.6        |       0       |
| VMC DF individuelle avec échangeur après 2012              |      0.26       |       0.26       |       0       |
| VMC DF collective avec échangeur ≤ 2012                    |      0.75       |       0.75       |       0       |
| VMC DF collective avec échangeur après 2012                |      0.46       |       0.46       |       0       |
| VMC DF sans échangeur ≤ 2012                               |      1.65       |       1.65       |       0       |
| VMC DF sans échangeur après 2012                           |      1.32       |       1.32       |       0       |
| Ventilation naturelle par conduit                          |      2.23       |        0         |       4       |
| Ventilation hybride < 2001                                 |      1.52       |        0         |       3       |
| Ventilation hybride de 2001 à 2012                         |      1.33       |        0         |       3       |
| Ventilation hybride après 2012                             |      1.17       |        0         |       3       |
| Ventilation hybride avec entrées d'air hygro < 2001        |      1.52       |        0         |       2       |
| Ventilation hybride avec entrées d'air hygro de 2001 à     |      1.33       |        0         |       2       |
| Ventilation hybride avec entrées d'air hygro après 2012    |      1.17       |        0         |       2       |
| Ventilation mécanique sur conduit existant ≤ 2012          |      2.24       |        0         |       4       |
| Ventilation mécanique sur conduit existant après 2012      |      1.97       |        0         |       4       |
| Ventilation naturelle par conduit avec entrées d'air hygro |      2.23       |        0         |       3       |
| Puits climatique sans échangeur ≤ 2012                     |      0.99       |       0.99       |       0       |
| Puits climatique sans échangeur après 2012                 |      0.79       |       0.79       |       0       |
| Puits climatique avec échangeur ≤ 2012                     |      0.36       |       0.36       |       0       |
| Puits climatique avec échangeur après 2012                 |      0.16       |       0.16       |       0       |

**Cas des VMC par insufflation :**

Les VMC par insufflation sont traitées comme des VMC simple flux autoréglables et avec les mêmes caractéristiques
selon les années d'installation.

**Cas des puits climatiques (intégrés au tableau ci-dessus) :**

Le puits climatique est considéré comme une VMC double flux faisant rentrer dans le logement de l'air à une
température proche de celle du sol.

Par hypothèse la température moyenne en sortie du puits canadien est de 12°C. La température moyenne extérieure
d'Octobre à Avril est de 8°C.

La modélisation du puits climatique est donc comparable à une celle d'une VMC double flux avec une correction sur les températures -> correction = $\frac{Tint - 12}{Tint - 8} = 0.6$ appliquée pour obtenir les valeurs présentes dans le tableau.
