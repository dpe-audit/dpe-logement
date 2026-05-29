import * as Climat from "#rules/climat/rules.js";
import * as Ventilation from "#rules/ventilation/rules.js";
import * as InstallationVentilation from "#rules/ventilation/installation/rules.js";

export type Results = {
	[Climat.ID]: Climat.ClimatResults;

	[Ventilation.ID]: Ventilation.VentilationResults;
	[InstallationVentilation.ID]: Record<
		string,
		InstallationVentilation.VentilationInstallationResults
	>;
};
