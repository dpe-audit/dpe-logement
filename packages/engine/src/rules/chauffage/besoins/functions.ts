import { Enveloppe } from "@open-dpe-logement/models";

/**
 * @param props.gv : Déperditions thermiques totales de l'enveloppe en W/K
 * @param props.f : Fraction des besoins de chauffage couverts par les apports gratuits
 * @returns Besoins mensuels de chauffage en kWh
 */
export function bv(props: { gv: number; f: number }): number {
	const { gv, f } = props;
	return (gv * (1 - f)) / 1000;
}

/**
 * @param props.inertie : Inertie de l'enveloppe
 * @param props.gv : Déperditions thermiques totales de l'enveloppe en W/K
 * @param props.dh : Degrés-heures de chauffage
 * @param props.as : Apports solaires en période de chauffage en Wh
 * @param props.ai : Apports internes en période de chauffage en Wh
 * @returns Fraction des besoins de chauffage couverts par les apports gratuits
 */
export function f(props: {
	inertie: Enveloppe.Common.Inertie;
	gv: number;
	dh: number;
	as: number;
	ai: number;
}): number {
	const { inertie, gv, dh, as, ai } = props;
	const x = (as + ai) / (gv * dh);

	switch (inertie) {
		case Enveloppe.Common.InertieEnum.tres_lourde:
			return (x - x ** 3.6) / (1 - x ** 3.6);
		case Enveloppe.Common.InertieEnum.lourde:
			return (x - x ** 3.6) / (1 - x ** 3.6);
		case Enveloppe.Common.InertieEnum.moyenne:
			return (x - x ** 2.9) / (1 - x ** 2.9);
		case Enveloppe.Common.InertieEnum.legere:
			return (x - x ** 2.5) / (1 - x ** 2.5);
	}
}
