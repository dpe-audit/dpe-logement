import { describe, expect, it } from 'vitest'
import { find, search } from './filter.js'

describe('search — filtre match (string[])', () => {
  it('retourne les lignes correspondant à une valeur exacte', () => {
    const rows = [
      { zone_climatique: ['H1a'], nhecl: 1500 },
      { zone_climatique: ['H1b'], nhecl: 1445 },
    ]
    expect(search(rows, { zone_climatique: 'H1a' })).toEqual([
      { zone_climatique: ['H1a'], nhecl: 1500 },
    ])
  })

  it('retourne un tableau vide si aucune correspondance', () => {
    const rows = [{ zone_climatique: ['H1a'], nhecl: 1500 }]
    expect(search(rows, { zone_climatique: 'H3' })).toEqual([])
  })

  it('accepte une valeur présente dans un tableau pipe-splité', () => {
    const rows = [{ zone_climatique: ['H1a', 'H1b', 'H1c'], etiquette: 'A' }]
    expect(search(rows, { zone_climatique: 'H1b' })).toEqual([
      { zone_climatique: ['H1a', 'H1b', 'H1c'], etiquette: 'A' },
    ])
  })

  it('refuse une valeur absente du tableau', () => {
    const rows = [{ zone_climatique: ['H1a', 'H1b'], etiquette: 'A' }]
    expect(search(rows, { zone_climatique: 'H3' })).toEqual([])
  })

  it('traite null comme un wildcard', () => {
    const rows = [{ type_ventilation: null, qvarep_conv: 1.97 }]
    expect(search(rows, { type_ventilation: 'vmc_double_flux' })).toEqual([
      { type_ventilation: null, qvarep_conv: 1.97 },
    ])
  })

  it('convertit un booléen true en 1 pour comparaison avec cellule numérique', () => {
    const rows = [
      { chauffage_central: 1, i0: 0.91 },
      { chauffage_central: 0, i0: 0.84 },
    ]
    expect(search(rows, { chauffage_central: true })).toEqual([
      { chauffage_central: 1, i0: 0.91 },
    ])
  })

  it('convertit un booléen false en 0 pour comparaison avec cellule numérique', () => {
    const rows = [
      { chauffage_central: 1, i0: 0.91 },
      { chauffage_central: 0, i0: 0.84 },
    ]
    expect(search(rows, { chauffage_central: false })).toEqual([
      { chauffage_central: 0, i0: 0.84 },
    ])
  })
})

describe('search — filtre range (RangeBounds)', () => {
  it("accepte une valeur dans l'intervalle [gte, lte]", () => {
    const rows = [
      { annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 },
      { annee: { gte: 2001, lte: 2012 }, qvarep_conv: 1.5 },
    ]
    expect(search(rows, { annee: 1995 })).toEqual([
      { annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 },
    ])
  })

  it('refuse une valeur hors intervalle', () => {
    const rows = [{ annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 }]
    expect(search(rows, { annee: 2015 })).toEqual([])
  })

  it('traite une borne null comme absence de restriction', () => {
    const rows = [{ annee: { gte: null, lte: 1981 }, qvarep_conv: 1.97 }]
    expect(search(rows, { annee: 1970 })).toEqual([
      { annee: { gte: null, lte: 1981 }, qvarep_conv: 1.97 },
    ])
  })

  it('applique gt (strictement supérieur)', () => {
    const rows = [
      { pdim: { gt: 5, lte: 10 }, pn: 18 },
      { pdim: { gt: null, lte: 5 }, pn: 12 },
    ]
    expect(search(rows, { pdim: 5 })).toEqual([{ pdim: { gt: null, lte: 5 }, pn: 12 }])
    expect(search(rows, { pdim: 6 })).toEqual([{ pdim: { gt: 5, lte: 10 }, pn: 18 }])
  })

  it('applique lt (strictement inférieur)', () => {
    const rows = [{ cep: { lt: 70 }, etiquette: 'A' }]
    expect(search(rows, { cep: 69 })).toEqual([{ cep: { lt: 70 }, etiquette: 'A' }])
    expect(search(rows, { cep: 70 })).toEqual([])
  })

  it('applique eq (égalité)', () => {
    const rows = [
      { mois: { eq: 1 }, epv: 0.75 },
      { mois: { eq: 2 }, epv: 0.8 },
    ]
    expect(search(rows, { mois: 1 })).toEqual([{ mois: { eq: 1 }, epv: 0.75 }])
  })

  it('traite RangeBounds null comme wildcard', () => {
    const rows = [{ annee: null, qvarep_conv: 1.97 }]
    expect(search(rows, { annee: 2010 })).toEqual([{ annee: null, qvarep_conv: 1.97 }])
  })

  it('rejette si la valeur de query range est non numérique', () => {
    const rows = [{ annee: { gte: 1982, lte: 2000 }, qvarep_conv: 1.65 }]
    expect(search(rows, { annee: '1995abc' })).toEqual([])
  })
})

describe('search — filtre combiné match + range', () => {
  it('applique simultanément match (string[]) et range (RangeBounds)', () => {
    const rows = [
      { type: ['vmc_double_flux'], annee: { gte: null, lte: 2012 }, debit: 0.6 },
      { type: ['vmc_double_flux'], annee: { gte: 2013, lte: null }, debit: 0.26 },
      { type: ['vmc_simple_flux_autoreglable'], annee: { gte: null, lte: 2012 }, debit: 1.97 },
    ]
    expect(search(rows, { type: 'vmc_double_flux', annee: 2010 })).toEqual([
      { type: ['vmc_double_flux'], annee: { gte: null, lte: 2012 }, debit: 0.6 },
    ])
  })
})

describe('find', () => {
  it('retourne le premier élément correspondant', () => {
    const rows = [
      { zone_climatique: ['H1a'], nhecl: 1500 },
      { zone_climatique: ['H1b'], nhecl: 1445 },
    ]
    expect(find(rows, { zone_climatique: 'H1b' })).toEqual({
      zone_climatique: ['H1b'],
      nhecl: 1445,
    })
  })

  it('retourne null si aucune correspondance', () => {
    const rows = [{ zone_climatique: ['H1a'], nhecl: 1500 }]
    expect(find(rows, { zone_climatique: 'H3' })).toBeNull()
  })
})
