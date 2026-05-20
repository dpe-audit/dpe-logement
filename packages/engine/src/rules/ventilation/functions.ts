import * as installation from "#rules/ventilation/installation/functions.js";

/**
 * @param props.installations : Liste des installations de ventilation
 * @param props.installations[].hvent : {@linkcode installation.calcule_hvent}
 * @param props.installations[].rdim : {@linkcode installation.calcule_rdim}
 * @returns Déperditions thermiques par renouvellement d'air due au système de ventilation en W/K
 */
export function calcule_hvent(props: {
	installations: { hvent: number; rdim: number }[];
}): number {
	const { installations } = props;
	return installations.reduce((acc, i) => acc + i.hvent * i.rdim, 0);
}

/**
 * @param props.installations : Liste des installations de ventilation
 * @param props.installations[].qvarep_conv : {@linkcode installation.calcule_debits}
 * @param props.installations[].rdim : {@linkcode installation.calcule_rdim}
 * @returns Débit volumique conventionnel moyen à reprendre en m3/(h.m²)
 */
export function calcule_qvarep_conv(props: {
	installations: { qvarep_conv: number; rdim: number }[];
}): number {
	const { installations } = props;
	const s = installations.reduce((acc, i) => acc + i.rdim, 0);
	const w = installations.reduce((acc, i) => acc + i.qvarep_conv * i.rdim, 0);
	return s === 0 ? 0 : w / s;
}

/**
 * @param props.installations : Liste des installations de ventilation
 * @param props.installations[].qvasouf_conv : {@linkcode installation.calcule_debits}
 * @param props.installations[].rdim : {@linkcode installation.calcule_rdim}
 * @returns Débit volumique conventionnel moyen à souffler en m3/(h.m²)
 */
export function calcule_qvasouf_conv(props: {
	installations: { qvasouf_conv: number; rdim: number }[];
}): number {
	const { installations } = props;
	const s = installations.reduce((acc, i) => acc + i.rdim, 0);
	const w = installations.reduce((acc, i) => acc + i.qvasouf_conv * i.rdim, 0);
	return s === 0 ? 0 : w / s;
}

/**
 * @param props.installations : Liste des installations de ventilation
 * @param props.installations[].smea_conv : {@linkcode installation.calcule_debits}
 * @param props.installations[].rdim : {@linkcode installation.calcule_rdim}
 * @returns Moyenne des sommes des modules d'entrée d'air sous 20 Pa en m3/(h.m²)
 */
export function calcule_smea_conv(props: {
	installations: { smea_conv: number; rdim: number }[];
}): number {
	const { installations } = props;
	const s = installations.reduce((acc, i) => acc + i.rdim, 0);
	const w = installations.reduce((acc, i) => acc + i.smea_conv * i.rdim, 0);
	return s === 0 ? 0 : w / s;
}
