export type EERSchema = {
	zone_climatique: string;
	annee_installation: number;
	seer: number;
	eer: number;
};

export type EERQuery = {
	zone_climatique: string;
	annee_installation: number;
};
