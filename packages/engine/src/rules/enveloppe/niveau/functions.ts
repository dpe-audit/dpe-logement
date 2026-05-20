import { Enveloppe } from "@open-dpe-logement/models";

/**
 * @param props.inertie_paroi_verticale - {@link Enveloppe.Common.InertieParoi}
 * @param props.inertie_plancher_haut - {@link Enveloppe.Common.InertieParoi}
 * @param props.inertie_plancher_bas - {@link Enveloppe.Common.InertieParoi}
 * @returns État d'inertie du niveau
 */
export function calcule_inertie(props: {
	inertie_paroi_verticale: boolean;
	inertie_plancher_haut: boolean;
	inertie_plancher_bas: boolean;
}): Enveloppe.Common.Inertie {
	const values = Object.values(props);
	const count = values.filter((value) => value === true).length;
	if (count === 3) return Enveloppe.Common.InertieEnum.tres_lourde;
	if (count === 2) return Enveloppe.Common.InertieEnum.lourde;
	if (count === 1) return Enveloppe.Common.InertieEnum.moyenne;
	return Enveloppe.Common.InertieEnum.legere;
}

/**
 * @param props.inertie - État d'inertie saisi
 * @returns État d'inertie retenu
 */
export function set_inertie(props: { inertie: boolean | null }): boolean {
	return props.inertie !== null ? props.inertie : false;
}
