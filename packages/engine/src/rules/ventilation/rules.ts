import type { Context } from "#core/context.js";
import * as functions from "./functions.js";
import * as Installation from "./installation/rules.js";

export type VentilationResults = {
	caux: ReturnType<typeof functions.calcule_caux>;
	qvarep_conv: ReturnType<typeof functions.calcule_qvarep_conv>;
	qvasouf_conv: ReturnType<typeof functions.calcule_qvasouf_conv>;
	smea_conv: ReturnType<typeof functions.calcule_smea_conv>;
	hvent: ReturnType<typeof functions.calcule_hvent>;
};

export const ID = "ventilation";

export const RULES = {
	caux: "caux",
	qvarep_conv: "qvarep_conv",
	qvasouf_conv: "qvasouf_conv",
	smea_conv: "smea_conv",
	hvent: "hvent",
} as const;

export function register(ctx: Context): void {
	Installation.register(ctx);

	ctx.register(ID, RULES.caux, () => get_caux(ctx));
	ctx.register(ID, RULES.qvarep_conv, () => get_qvarep_conv(ctx));
	ctx.register(ID, RULES.qvasouf_conv, () => get_qvasouf_conv(ctx));
	ctx.register(ID, RULES.smea_conv, () => get_smea_conv(ctx));
	ctx.register(ID, RULES.hvent, () => get_hvent(ctx));
}

function get_caux(ctx: Context): VentilationResults["caux"] {
	return functions.calcule_caux({
		caux: ctx.diagnostic.ventilation.installations.map((item) =>
			ctx.resolve(Installation.ID, Installation.RULES.caux, item),
		),
	});
}

function get_qvarep_conv(ctx: Context): VentilationResults["qvarep_conv"] {
	return functions.calcule_qvarep_conv({
		installations: ctx.diagnostic.ventilation.installations.map((item) => ({
			qvarep_conv: ctx.resolve(Installation.ID, Installation.RULES.debits, item)
				.qvarep_conv,
			rdim: ctx.resolve(Installation.ID, Installation.RULES.rdim, item),
		})),
	});
}

function get_qvasouf_conv(ctx: Context): VentilationResults["qvasouf_conv"] {
	return functions.calcule_qvasouf_conv({
		installations: ctx.diagnostic.ventilation.installations.map((item) => ({
			qvasouf_conv: ctx.resolve(
				Installation.ID,
				Installation.RULES.debits,
				item,
			).qvasouf_conv,
			rdim: ctx.resolve(Installation.ID, Installation.RULES.rdim, item),
		})),
	});
}

function get_smea_conv(ctx: Context): VentilationResults["smea_conv"] {
	return functions.calcule_smea_conv({
		installations: ctx.diagnostic.ventilation.installations.map((item) => ({
			smea_conv: ctx.resolve(Installation.ID, Installation.RULES.debits, item)
				.smea_conv,
			rdim: ctx.resolve(Installation.ID, Installation.RULES.rdim, item),
		})),
	});
}

function get_hvent(ctx: Context): VentilationResults["hvent"] {
	return functions.calcule_hvent({
		installations: ctx.diagnostic.ventilation.installations.map((item) => ({
			hvent: ctx.resolve(Installation.ID, Installation.RULES.hvent, item),
			rdim: ctx.resolve(Installation.ID, Installation.RULES.rdim, item),
		})),
	});
}
