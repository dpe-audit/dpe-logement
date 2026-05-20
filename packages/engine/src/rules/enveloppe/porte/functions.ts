import { ValeurForfaitaireError } from "#utils/errors.js";
import { abaques } from "@open-dpe-logement/abaques";
import { Enveloppe } from "@open-dpe-logement/models";

/**
 * @param props.u_saisi : Coefficient de transmission thermique saisi
 * @param props.taux_vitrage : Taux de vitrage de la porte
 * @param props.type_vitrage : {@linkcode set_type_vitrage}
 * @param props.isolation : {@linkcode set_isolation}
 * @param props.materiau : {@linkcode set_materiau}
 * @param props.presence_sas : Indique la présence d'un sas derrière la porte
 * @see abaques.enveloppe.porte.uporte
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de transmission thermique de la porte en W/m².K
 */
export function u(props: {
	u_saisi: number | null;
	taux_vitrage: number;
	type_vitrage: Enveloppe.Porte.TypeVitrage | null;
	isolation: boolean;
	materiau: Enveloppe.Porte.Materiau;
	presence_sas: boolean;
}): number {
	if (props.u_saisi) return props.u_saisi;
	const abaque = abaques.enveloppe.porte.uporte;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.u;
}

/**
 * @param props.isolation : État d'isolation de la porte saisi
 * @returns État d'isolation de la porte retenu
 */
export function set_isolation(props: { isolation: boolean | null }): boolean {
	return props.isolation ? true : false;
}

/**
 * @param props.materiau : Matériau de la porte saisi
 * @returns Matériau de la porte retenu
 */
export function set_materiau(props: {
	materiau: Enveloppe.Porte.Materiau | null;
}): Enveloppe.Porte.Materiau {
	return props.materiau ?? Enveloppe.Porte.MateriauEnum.pvc;
}

/**
 * @param props.type_vitrage : Type de vitrage de la porte saisi
 * @returns Type de vitrage de la porte retenu
 */
export function set_type_vitrage(props: {
	type_vitrage: Enveloppe.Porte.TypeVitrage | null;
}): Enveloppe.Porte.TypeVitrage {
	return props.type_vitrage ?? Enveloppe.Porte.TypeVitrageEnum.simple_vitrage;
}
