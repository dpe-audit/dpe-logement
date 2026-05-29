import { Ventilation } from "@open-dpe-logement/models";
import type { Context } from "#core/context.js";
import * as functions from "./functions.js";

export type VentilationInstallationResults = {
	caux: ReturnType<typeof functions.calcule_caux>;
	pvent_moy: ReturnType<typeof functions.calcule_pvent_moy>;
	rut: ReturnType<typeof functions.calcule_rut>;
	rdim: ReturnType<typeof functions.calcule_rdim>;
	debits: ReturnType<typeof functions.calcule_debits>;
	hvent: ReturnType<typeof functions.calcule_hvent>;
};

export const ID = "ventilation:installation";

export const RULES = {
	caux: "caux",
	pvent_moy: "pvent_moy",
	rut: "rut",
	rdim: "rdim",
	debits: "debits",
	hvent: "hvent",
} as const;

export function register(ctx: Context): void {
	ctx.diagnostic.ventilation.installations.forEach((item) => {
		ctx.register(ID, RULES.caux, item, () => get_caux(ctx, item));
		ctx.register(ID, RULES.pvent_moy, item, () => get_pvent_moy(ctx, item));
		ctx.register(ID, RULES.rdim, item, () => get_rdim(ctx, item));
		ctx.register(ID, RULES.rut, item, () => get_rut(item));
		ctx.register(ID, RULES.debits, item, () => get_debits(ctx, item));
		ctx.register(ID, RULES.hvent, item, () => get_hvent(ctx, item));
	});
}

function get_caux(
	ctx: Context,
	item: Ventilation.Installation.Installation,
): VentilationInstallationResults["caux"] {
	return functions.calcule_caux({
		rdim: ctx.resolve(ID, RULES.rdim, item),
		pvent_moy: ctx.resolve(ID, RULES.pvent_moy, item),
		rut: ctx.resolve(ID, RULES.rut, item),
	});
}

function get_pvent_moy(
	ctx: Context,
	item: Ventilation.Installation.Installation,
): VentilationInstallationResults["pvent_moy"] {
	return functions.calcule_pvent_moy({
		type_batiment: ctx.diagnostic.batiment.type,
		type_ventilation: item.type,
		annee_installation: get_annee_installation(ctx, item),
		surface_installation: item.surface,
		qvarep_conv: ctx.resolve(ID, RULES.debits, item)["qvarep_conv"],
	});
}

function get_rdim(
	ctx: Context,
	item: Ventilation.Installation.Installation,
): VentilationInstallationResults["rdim"] {
	const surface_installation = item.surface;
	const surface_installations = ctx.diagnostic.ventilation.installations.reduce(
		(s, i) => s + i.surface,
		0,
	);
	return functions.calcule_rdim({
		surface_installation,
		surface_installations,
	});
}

function get_rut(
	item: Ventilation.Installation.Installation,
): VentilationInstallationResults["rut"] {
	return functions.calcule_rut({
		type_ventilation: item.type,
		installation_collective: item.installation_collective,
	});
}

function get_debits(
	ctx: Context,
	item: Ventilation.Installation.Installation,
): VentilationInstallationResults["debits"] {
	return functions.calcule_debits({
		type_ventilation: item.type,
		installation_collective: item.installation_collective,
		annee_installation: get_annee_installation(ctx, item),
		presence_echangeur_thermique: get_presence_echangeur_thermique(item),
	});
}

function get_hvent(
	ctx: Context,
	item: Ventilation.Installation.Installation,
): VentilationInstallationResults["hvent"] {
	return functions.calcule_hvent({
		sh: item.surface,
		rdim: ctx.resolve(ID, RULES.rdim, item),
		qvarep_conv: ctx.resolve(ID, RULES.debits, item)["qvarep_conv"],
	});
}

function get_annee_installation(
	ctx: Context,
	item: Ventilation.Installation.Installation,
) {
	return functions.set_annee_installation({
		annee_installation: item.annee_installation,
		annee_construction_batiment: ctx.diagnostic.batiment.annee_construction,
	});
}

function get_presence_echangeur_thermique(
	item: Ventilation.Installation.Installation,
) {
	return functions.set_presence_echangeur_thermique({
		presence_echangeur_thermique: item.presence_echangeur_thermique,
	});
}
