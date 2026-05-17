import { ChauffageCombustionRepository } from './repositories/chauffage/combustion.js'
import { ChauffageFchRepository } from './repositories/chauffage/fch.js'
import { ChauffageI0Repository } from './repositories/chauffage/i0.js'
import { ChauffagePauxRepository } from './repositories/chauffage/paux.js'
import { ChauffagePnRepository } from './repositories/chauffage/pn.js'
import { ChauffageRdRepository } from './repositories/chauffage/rd.js'
import { ChauffageReRepository } from './repositories/chauffage/re.js'
import { ChauffageRgRepository } from './repositories/chauffage/rg.js'
import { ChauffageRrRepository } from './repositories/chauffage/rr.js'
import { ChauffageScopRepository } from './repositories/chauffage/scop.js'
import { ChauffageTfonc100Repository } from './repositories/chauffage/tfonc100.js'
import { ChauffageTfonc30Repository } from './repositories/chauffage/tfonc30.js'
import { ClimatC1Repository } from './repositories/climat/c1.js'
import { ClimatNjRepository } from './repositories/climat/nj.js'
import { ClimatSollicitationsRepository } from './repositories/climat/sollicitations.js'
import { ClimatTbaseRepository } from './repositories/climat/tbase.js'
import { ClimatZoneClimatiqueRepository } from './repositories/climat/zone-climatique.js'
import { EclairageNheclRepository } from './repositories/eclairage/nhecl.js'
import { EcsCombustionRepository } from './repositories/ecs/combustion.js'
import { EcsCopRepository } from './repositories/ecs/cop.js'
import { EcsCrRepository } from './repositories/ecs/cr.js'
import { EcsFecsRepository } from './repositories/ecs/fecs.js'
import { EcsPauxRepository } from './repositories/ecs/paux.js'
import { EcsRdRepository } from './repositories/ecs/rd.js'
import { EcsRgRepository } from './repositories/ecs/rg.js'
import { BaieDelatarRepository } from './repositories/enveloppe/baie/deltar.js'
import { BaieSwRepository } from './repositories/enveloppe/baie/sw.js'
import { BaieUgRepository } from './repositories/enveloppe/baie/ug.js'
import { BaieUjnRepository } from './repositories/enveloppe/baie/ujn.js'
import { BaieUwRepository } from './repositories/enveloppe/baie/uw.js'
import { LocalNonChauffeBRepository } from './repositories/enveloppe/local-non-chauffe/b.js'
import { LocalNonChauffeTRepository } from './repositories/enveloppe/local-non-chauffe/t.js'
import { LocalNonChauffeUvueRepository } from './repositories/enveloppe/local-non-chauffe/uvue.js'
import { MasqueFe1Repository } from './repositories/enveloppe/masque/fe1.js'
import { MasqueFe2Repository } from './repositories/enveloppe/masque/fe2.js'
import { MasqueOmbRepository } from './repositories/enveloppe/masque/omb.js'
import { MurURepository } from './repositories/enveloppe/mur/u.js'
import { MurU0DoublageRepository } from './repositories/enveloppe/mur/u0-doublage.js'
import { MurU0Repository } from './repositories/enveloppe/mur/u0.js'
import { ParoiBRepository } from './repositories/enveloppe/paroi/b.js'
import { ParoiBverRepository } from './repositories/enveloppe/paroi/bver.js'
import { PermeabiliteQ4paconvRepository } from './repositories/enveloppe/permeabilite/q4paconv.js'
import { PlancherBasURepository } from './repositories/enveloppe/plancher-bas/u.js'
import { PlancherBasU0Repository } from './repositories/enveloppe/plancher-bas/u0.js'
import { PlancherBasUeRepository } from './repositories/enveloppe/plancher-bas/ue.js'
import { PlancherHautURepository } from './repositories/enveloppe/plancher-haut/u.js'
import { PlancherHautU0Repository } from './repositories/enveloppe/plancher-haut/u0.js'
import { PontThermiqueKptRepository } from './repositories/enveloppe/pont-thermique/kpt.js'
import { PorteURepository } from './repositories/enveloppe/porte/u.js'
import { PerformanceEtiquetteClimatRepository } from './repositories/performance/etiquette-climat.js'
import { PerformanceEtiquetteEnergieRepository } from './repositories/performance/etiquette-energie.js'
import { PerformanceFcepRepository } from './repositories/performance/fcep.js'
import { PerformanceFegesRepository } from './repositories/performance/feges.js'
import { PerformanceReseauRepository } from './repositories/performance/reseau.js'
import { ProductionKpvRepository } from './repositories/production/kpv.js'
import { RefroidissementEerRepository } from './repositories/refroidissement/eer.js'
import { VentilationDebitsRepository } from './repositories/ventilation/debits.js'
import { VentilationPventRepository } from './repositories/ventilation/pvent.js'
import { VentilationPventMoyRepository } from './repositories/ventilation/pvent_moy.js'

export const abaques = {
  chauffage: {
    combustion: new ChauffageCombustionRepository(),
    fch: new ChauffageFchRepository(),
    i0: new ChauffageI0Repository(),
    paux: new ChauffagePauxRepository(),
    pn: new ChauffagePnRepository(),
    rd: new ChauffageRdRepository(),
    re: new ChauffageReRepository(),
    rg: new ChauffageRgRepository(),
    rr: new ChauffageRrRepository(),
    scop: new ChauffageScopRepository(),
    tfonc100: new ChauffageTfonc100Repository(),
    tfonc30: new ChauffageTfonc30Repository(),
  },
  climat: {
    c1: new ClimatC1Repository(),
    nj: new ClimatNjRepository(),
    sollicitations: new ClimatSollicitationsRepository(),
    tbase: new ClimatTbaseRepository(),
    zoneClimatique: new ClimatZoneClimatiqueRepository(),
  },
  eclairage: {
    nhecl: new EclairageNheclRepository(),
  },
  ecs: {
    combustion: new EcsCombustionRepository(),
    cop: new EcsCopRepository(),
    cr: new EcsCrRepository(),
    fecs: new EcsFecsRepository(),
    paux: new EcsPauxRepository(),
    rd: new EcsRdRepository(),
    rg: new EcsRgRepository(),
  },
  enveloppe: {
    baie: {
      deltar: new BaieDelatarRepository(),
      sw: new BaieSwRepository(),
      ug: new BaieUgRepository(),
      ujn: new BaieUjnRepository(),
      uw: new BaieUwRepository(),
    },
    localNonChauffe: {
      b: new LocalNonChauffeBRepository(),
      t: new LocalNonChauffeTRepository(),
      uvue: new LocalNonChauffeUvueRepository(),
    },
    masque: {
      fe1: new MasqueFe1Repository(),
      fe2: new MasqueFe2Repository(),
      omb: new MasqueOmbRepository(),
    },
    mur: {
      u: new MurURepository(),
      u0Doublage: new MurU0DoublageRepository(),
      u0: new MurU0Repository(),
    },
    paroi: {
      b: new ParoiBRepository(),
      bver: new ParoiBverRepository(),
    },
    permeabilite: {
      q4paconv: new PermeabiliteQ4paconvRepository(),
    },
    plancherBas: {
      u: new PlancherBasURepository(),
      u0: new PlancherBasU0Repository(),
      ue: new PlancherBasUeRepository(),
    },
    plancherHaut: {
      u: new PlancherHautURepository(),
      u0: new PlancherHautU0Repository(),
    },
    pontThermique: {
      kpt: new PontThermiqueKptRepository(),
    },
    porte: {
      u: new PorteURepository(),
    },
  },
  performance: {
    etiquetteClimat: new PerformanceEtiquetteClimatRepository(),
    etiquetteEnergie: new PerformanceEtiquetteEnergieRepository(),
    fcep: new PerformanceFcepRepository(),
    feges: new PerformanceFegesRepository(),
    reseau: new PerformanceReseauRepository(),
  },
  production: {
    kpv: new ProductionKpvRepository(),
  },
  refroidissement: {
    eer: new RefroidissementEerRepository(),
  },
  ventilation: {
    debits: new VentilationDebitsRepository(),
    pvent: new VentilationPventRepository(),
    pventMoy: new VentilationPventMoyRepository(),
  },
}

export type Abaques = typeof abaques
