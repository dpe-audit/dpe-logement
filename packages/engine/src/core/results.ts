import type { VentilationResults } from "#rules/ventilation/rules.js";
import type { VentilationInstallationResults } from "#rules/ventilation/installation/rules.js";

export type Results = {
	ventilation: VentilationResults;
	"ventilation:installation": Record<string, VentilationInstallationResults>;
};
