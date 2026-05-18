import { Common } from "@open-dpe-logement/models";

/**
 * Conversion énergie finale -> énergie primaire
 * @see Arrêté 15 septembre 2006 – Annexe 4
 */
export default function toCEP(props: {
	cef: number;
	energie: Common.Energie;
}): number {
	const { cef, energie } = props;

	switch (energie) {
		case Common.EnergieEnum.electricite:
			return cef * 1.9;
		default:
			return cef;
	}
}
