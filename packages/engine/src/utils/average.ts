/**
 * Moyenne simple ou pondérée
 */
export const average = (props: {
	values: number[];
	weights?: number[];
}): number => {
	const { values, weights } = props;

	if (0 === values.length) {
		throw new Error("La liste des valeurs est vide.");
	}
	if (!weights) {
		return values.reduce((a, b) => a + b, 0) / values.length;
	}
	if (values.length !== weights.length) {
		throw new Error(
			"Les listes 'values' et 'weights' doivent avoir la même longueur.",
		);
	}
	const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

	if (totalWeight !== 1) {
		throw new Error("La somme des poids ('weights') doit être égale à 1.");
	}

	const weightedSum = values.reduce(
		(sum, value, index) => sum + value * weights[index]!,
		0,
	);

	return weightedSum / totalWeight;
};
