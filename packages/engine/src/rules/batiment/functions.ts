/**
 * @props surface_habitable_batiment - Surface habitable totale du bâtiment en m²
 * @props surface_habitable_logement - Surface habitable du logement en m²
 * @return Ratio de proratisation
 */
export function calcule_ratio_proratisation(props: {
	surface_habitable_batiment: number;
	surface_habitable_logement: number | undefined;
}): number {
	const { surface_habitable_batiment, surface_habitable_logement } = props;
	return surface_habitable_logement
		? surface_habitable_batiment / surface_habitable_logement
		: 1;
}
