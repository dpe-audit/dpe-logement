import type { NonEmptyArray } from "#/utils.js";
import type { Consommations, UUID } from "../common/common.js";

/**
 * @see https://schemas.open-dpe.fr/refroidissement/installation
 */
export type Installation = {
	id: UUID;
	description: string;
	surface: number;
	generateurs: NonEmptyArray<UUID>;
};

export type InstallationWithData<T extends Installation = Installation> = T & {
	data: InstallationData;
};

export type InstallationData = {
	rdim: number;
	consommations: Consommations;
};
