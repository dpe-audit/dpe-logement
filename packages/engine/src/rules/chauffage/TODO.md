# TODO - Chauffage

## Règles

- [ ] **chauffage:effet_joule** - Chauffage par effet joule

### Besoin

- [ ] **chauffage:besoin:bch** - Besoin de chauffage en kWh/mois
- [ ] **chauffage:besoin:bch_hp** - Besoin de chauffage hors pertes récupérables en kWh/mois

### Auxiliaire

- [ ] **chauffage:auxiliaire:cef** - Consommation finale de l'auxiliaire de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:cep** - Consommation primaire de l'auxiliaire de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:eges** - Emissions de CO2 de l'auxiliaire de chauffage en kWh/an

#### Génération

- [ ] **chauffage:auxiliaire:generation:cef** - Consommation finale de l'auxiliaire de génération de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:generation:cep** - Consommation primaire de l'auxiliaire de génération de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:generation:eges** - Emissions de CO2 de l'auxiliaire de génération de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:generation:paux** - Puissance des auxiliaires de génération de chauffage en W

#### Distribution

- [ ] **chauffage:auxiliaire:distribution:cef** - Consommation finale de l'auxiliaire de distribution de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:distribution:cep** - Consommation primaire de l'auxiliaire de distribution de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:distribution:eges** - Emissions de CO2 de l'auxiliaire de distribution de chauffage en kWh/an
- [ ] **chauffage:auxiliaire:distribution:pcircem** - Puissance du circulateur de l'installation de chauffage en W
- [ ] **chauffage:auxiliaire:distribution:pnc** - Puissance nominale en chaud en kW
- [ ] **chauffage:auxiliaire:distribution:delta_theta_dim** - Chute nominale de température de dimensionnement de chauffage en °C
- [ ] **chauffage:auxiliaire:distribution:delta_p_emnom** - Pertes de charge du réseau de chauffage en kPa
- [ ] **chauffage:auxiliaire:distribution:delta_p_em** - Pertes de charge de l'émetteur de chauffage en kPa
- [ ] **chauffage:auxiliaire:distribution:lem** - Longueur du réseau de chauffage le plus défavorisé en m
- [ ] **chauffage:auxiliaire:distribution:fcot** - Coefficient de dimensionnement du réseau de distribution de chauffage

### Générateur

- [ ] **chauffage:generateur:rdim** - Ratio de dimensionnement du générateur de chauffage
- [ ] **chauffage:generateur:scop** - Coefficient de performance énergétique du générateur de chauffage
- [ ] **chauffage:generateur:rpn** - Rendement à pleine charge du générateur de chauffage
- [ ] **chauffage:generateur:rpint** - Rendement à charge intermédiaire du générateur de chauffage
- [ ] **chauffage:generateur:qp0** - Pertes à l'arrêt du générateur de chauffage en W
- [ ] **chauffage:generateur:pveil** - Puissance de la veilleuse du générateur de chauffage en W
- [ ] **chauffage:generateur:tfonc30** - Température de fonctionnement du générateur de chauffage à 30% de charge en °C
- [ ] **chauffage:generateur:tfonc100** - Température de fonctionnement du générateur de chauffage à 100% de charge en °C

### Installation

- [ ] **chauffage:installation:rdim** - Ratio de dimensionnement de l'installation de chauffage
- [ ] **chauffage:installation:fch** - Facteur de couverture solaire de l'installation de chauffage

### Système

- [ ] **chauffage:systeme:cef** - Consommation finale du système de chauffage en kWh/an
- [ ] **chauffage:systeme:cep** - Consommation primaire du système de chauffage en kWh/an
- [ ] **chauffage:systeme:eges** - Emissions de CO2 du système de chauffage en kWh/an
- [ ] **chauffage:generateur:pertes** - Pertes du générateur de chauffage en Wh/mois
- [ ] **chauffage:generateur:pertes_generation** - Pertes de génération du générateur de chauffage en Wh/mois
- [ ] **chauffage:generateur:pertes_generation_rec** - Pertes de génération récupérables du générateur de chauffage en Wh/mois
- [ ] **chauffage:systeme:rdim** - Ratio de dimensionnement du système de chauffage
- [ ] **chauffage:systeme:pe** - Puissance émise utile par le système de chauffage en base en kW
- [ ] **chauffage:systeme:t** - Température de dimensionnement du système de chauffage en °C
- [ ] **chauffage:systeme:dht** - Degré heure base T du système de chauffage en °C/h
- [ ] **chauffage:systeme:int** - Facteur d'intermittence du système de chauffage
- [ ] **chauffage:systeme:i0** - Coefficient d'intermittence du système de chauffage
- [ ] **chauffage:systeme:ich** - Inverse du rendement du système de chauffage
- [ ] **chauffage:systeme:rg** - Rendement de génération du système de chauffage
- [ ] **chauffage:systeme:rd** - Rendement de distribution du système de chauffage
- [ ] **chauffage:systeme:re** - Rendement d'émission du système de chauffage
- [ ] **chauffage:systeme:rr** - Rendement de régulation du système de chauffage
