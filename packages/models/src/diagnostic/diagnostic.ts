import type { Consommations, UUID } from "#/common/common.js";
import type { Chauffage } from "#/chauffage/chauffage.js";
import type { Ecs } from "#/ecs/ecs.js";
import type { Enveloppe } from "#/enveloppe/enveloppe.js";
import type { Production } from "#/production/production.js";
import type { Refroidissement } from "#/refroidissement/refroidissement.js";
import type { Ventilation } from "#/ventilation/ventilation.js";
import type { Batiment } from "#/batiment/batiment.js";

/**
 * @see https://schemas.open-dpe.fr/diagnostic
 */
export type Diagnostic = {
	date_visite: string;
	date_etablissement: string;
	batiment: Batiment;
	enveloppe: Enveloppe;
	chauffage: Chauffage;
	ecs: Ecs;
	ventilation: Ventilation;
	refroidissement: Refroidissement;
	production: Production;
};

export type DiagnosticWithData<T extends Diagnostic = Diagnostic> = T & {
	id: UUID;
	date: string;
	data: DiagnosticData;
};

export type DiagnosticData = {
	cef: number;
	cep: number;
	eges: number;
	consommations: Consommations;
};
