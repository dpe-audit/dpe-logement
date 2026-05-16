import type { Consommations, UUID } from "../common/common.js";
import { buildEnum } from "../utils.js";

/**
 * @see https://schemas.open-dpe.fr/ventilation/installation
 */
export type Installation =
	| InstallationNaturelle
	| InstallationMecanique
	| InstallationVMCDoubleFlux
	| InstallationPuitClimatique;

export type InstallationWithData<T extends Installation = Installation> = T & {
	data: InstallationData;
};

type InstallationBase = {
	id: UUID;
	description: string;
	surface: number;
	type: TypeVentilation;
	annee_installation: number | null;
	installation_collective: boolean | null;
	presence_echangeur_thermique: boolean | null;
};

export type InstallationNaturelle = InstallationBase & {
	type: TYPE_VENTILATION_NATURELLE;
	annee_installation: null;
	installation_collective: null;
};

export type InstallationMecanique = InstallationBase & {
	type: TYPE_VENTILATION_MECANIQUE;
	installation_collective: boolean;
	presence_echangeur_thermique: null;
};

export type InstallationVMCDoubleFlux = InstallationBase & {
	type: typeof TypeVentilationEnum.vmc_double_flux;
	installation_collective: boolean;
};

export type InstallationPuitClimatique = InstallationVMCDoubleFlux & {
	type: typeof TypeVentilationEnum.puit_climatique;
};

export type InstallationData = {
	rdim: number;
	qvarep_conv: number;
	qvasouf_conv: number;
	smea_conv: number;
	consommations: Consommations;
};

export const TYPES_VENTILATION = [
	"ventilation_ouverture_fenetres",
	"ventilation_entrees_air_hautes_basses",
	"ventilation_naturelle_conduit_entrees_air_hygroreglables",
	"ventilation_naturelle_conduit",
	"vmc_simple_flux_autoreglable",
	"vmc_simple_flux_hygroreglable_a",
	"vmc_simple_flux_hygroreglable_gaz",
	"vmc_simple_flux_hygroreglable_b",
	"vmc_basse_pression_autoreglable",
	"vmc_basse_pression_hygroreglable_a",
	"vmc_basse_pression_hygroreglable_b",
	"vmc_double_flux",
	"ventilation_hybride",
	"ventilation_hybride_entrees_air_hygroreglables",
	"ventilation_mecanique_conduit",
	"ventilation_mecanique_insufflation",
	"puit_climatique",
] as const;
export type TypeVentilation = (typeof TYPES_VENTILATION)[number];
export const TypeVentilationEnum = buildEnum(TYPES_VENTILATION);

const TYPES_VENTILATION_NATURELLE = [
	"ventilation_ouverture_fenetres",
	"ventilation_entrees_air_hautes_basses",
	"ventilation_naturelle_conduit_entrees_air_hygroreglables",
	"ventilation_naturelle_conduit",
] as const satisfies readonly TypeVentilation[];
type TYPE_VENTILATION_NATURELLE = (typeof TYPES_VENTILATION_NATURELLE)[number];

const TYPES_VENTILATION_MECANIQUE = [
	"vmc_simple_flux_autoreglable",
	"vmc_simple_flux_hygroreglable_a",
	"vmc_simple_flux_hygroreglable_gaz",
	"vmc_simple_flux_hygroreglable_b",
	"vmc_basse_pression_autoreglable",
	"vmc_basse_pression_hygroreglable_a",
	"vmc_basse_pression_hygroreglable_b",
	"ventilation_hybride",
	"ventilation_hybride_entrees_air_hygroreglables",
	"ventilation_mecanique_conduit",
	"ventilation_mecanique_insufflation",
] as const satisfies readonly TypeVentilation[];
type TYPE_VENTILATION_MECANIQUE = (typeof TYPES_VENTILATION_MECANIQUE)[number];
