import { describe, expect, it } from 'vitest'
import { filter } from './filter.js'

describe('filter — filtre match (string[])', () => {
  it('retourne les lignes correspondant à une valeur exacte', () => {
    const rows = [
      { zone_climatique: ['H1a'], nhecl: 1500 },
      { zone_climatique: ['H1b'], nhecl: 1445 },
    ]
    expect(filter({ zone_climatique: 'H1a' }, rows)).toEqual([
      { zone_climatique: ['H1a'], nhecl: 1500 },
    ])
  })

  it('retourne un tableau vide si aucune correspondance', () => {
    const rows = [{ zone_climatique: ['H1a'], nhecl: 1500 }]
    expect(filter({ zone_climatique: 'H3' }, rows)).toEqual([])
  })

  it('accepte une valeur présente dans un tableau pipe-splité', () => {
    const rows = [{ zone_climatique: ['H1a', 'H1b', 'H1c'], etiquette: 'A' }]
    expect(filter({ zone_climatique: 'H1b' }, rows)).toEqual([
      { zone_climatique: ['H1a', 'H1b', 'H1c'], etiquette: 'A' },
    ])
  })

  it('refuse une valeur absente du tableau', () => {
    const rows = [{ zone_climatique: ['H1a', 'H1b'], etiquette: 'A' }]
    expect(filter({ zone_climatique: 'H3' }, rows)).toEqual([])
  })

  it('traite null comme un wildcard', () => {
    const rows = [{ type_ventilation: null, qvarep_conv: 1.97 }]
    expect(filter({ type_ventilation: 'vmc_double_flux' }, rows)).toEqual([
      { type_ventilation: null, qvarep_conv: 1.97 },
    ])
  })

  it('convertit un booléen true en 1 pour comparaison avec cellule numérique', () => {
    const rows = [
      { chauffage_central: 1, i0: 0.91 },
      { chauffage_central: 0, i0: 0.84 },
    ]
    expect(filter({ chauffage_central: true }, rows)).toEqual([
      { chauffage_central: 1, i0: 0.91 },
    ])
  })

  it('convertit un booléen false en 0 pour comparaison avec cellule numérique', () => {
    const rows = [
      { chauffage_central: 1, i0: 0.91 },
      { chauffage_central: 0, i0: 0.84 },
    ]
    expect(filter({ chauffage_central: false }, rows)).toEqual([
      { chauffage_central: 0, i0: 0.84 },
    ])
  })
})

describe('filter — filtre range (RangeBounds)', () => {
  it("accepte une valeur dans l'intervalle [gte, lte]", () => {
    const rows = [
      { annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 },
      { annee: { gte: 2001, lte: 2012 }, qvarep_conv: 1.5 },
    ]
    expect(filter({ annee: 1995 }, rows)).toEqual([
      { annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 },
    ])
  })

  it('refuse une valeur hors intervalle', () => {
    const rows = [{ annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 }]
    expect(filter({ annee: 2015 }, rows)).toEqual([])
  })

  it('traite une borne null comme absence de restriction', () => {
    const rows = [{ annee: { gte: null, lte: 1981 }, qvarep_conv: 1.97 }]
    expect(filter({ annee: 1970 }, rows)).toEqual([
      { annee: { gte: null, lte: 1981 }, qvarep_conv: 1.97 },
    ])
  })

  it('applique gt (strictement supérieur)', () => {
    const rows = [
      { pdim: { gt: 5, lte: 10 }, pn: 18 },
      { pdim: { gt: null, lte: 5 }, pn: 12 },
    ]
    expect(filter({ pdim: 5 }, rows)).toEqual([{ pdim: { gt: null, lte: 5 }, pn: 12 }])
    expect(filter({ pdim: 6 }, rows)).toEqual([{ pdim: { gt: 5, lte: 10 }, pn: 18 }])
  })

  it('applique lt (strictement inférieur)', () => {
    const rows = [{ cep: { lt: 70 }, etiquette: 'A' }]
    expect(filter({ cep: 69 }, rows)).toEqual([{ cep: { lt: 70 }, etiquette: 'A' }])
    expect(filter({ cep: 70 }, rows)).toEqual([])
  })

  it('applique eq (égalité)', () => {
    const rows = [
      { mois: { eq: 1 }, epv: 0.75 },
      { mois: { eq: 2 }, epv: 0.8 },
    ]
    expect(filter({ mois: 1 }, rows)).toEqual([{ mois: { eq: 1 }, epv: 0.75 }])
  })

  it('traite RangeBounds null comme wildcard', () => {
    const rows = [{ annee: null, qvarep_conv: 1.97 }]
    expect(filter({ annee: 2010 }, rows)).toEqual([{ annee: null, qvarep_conv: 1.97 }])
  })

  it('rejette si la valeur de query range est non numérique', () => {
    const rows = [{ annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 }]
    expect(filter({ annee: '1995abc' }, rows)).toEqual([])
  })
})

describe('filter — filtre combiné match + range', () => {
  it('applique simultanément match (string[]) et range (RangeBounds)', () => {
    const rows = [
      { type: ['vmc_double_flux'], annee: { gte: null, lte: 2012 }, debit: 0.6 },
      { type: ['vmc_double_flux'], annee: { gte: 2013, lte: null }, debit: 0.26 },
      { type: ['vmc_simple_flux_autoreglable'], annee: { gte: null, lte: 2012 }, debit: 1.97 },
    ]
    expect(filter({ type: 'vmc_double_flux', annee: 2010 }, rows)).toEqual([
      { type: ['vmc_double_flux'], annee: { gte: null, lte: 2012 }, debit: 0.6 },
    ])
  })
})
