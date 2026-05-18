// @ts-check
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')

/** @type {Record<string, Record<string, string>>} */
const SCHEMA = JSON.parse(
  readFileSync(join(ROOT, 'scripts', 'abaques-schema.json'), 'utf-8')
)

/**
 * Détecte si un nom de colonne est une colonne range et retourne le suffixe.
 * @param {string} col
 * @returns {{ base: string, op: string } | null}
 */
function parseRangeHeader(col) {
  const ops = ['/eq', '/gte', '/gt', '/lte', '/lt']
  for (const op of ops) {
    if (col.endsWith(op)) {
      return { base: col.slice(0, -op.length), op: op.slice(1) }
    }
  }
  return null
}

/**
 * Parse une cellule CSV brute en valeur enrichie.
 * @param {string} raw
 * @returns {string[] | number | string | null}
 */
function parseCell(raw) {
  if (raw === '' || raw === undefined) return null
  if (raw.includes('|')) return raw.split('|')
  const num = parseFloat(raw.replace(',', '.'))
  if (!isNaN(num) && String(num) === raw.replace(',', '.')) return num
  return [raw]
}

/**
 * Parse une borne de colonne range (toujours numérique ou null).
 * @param {string} raw
 * @returns {number | null}
 */
function parseRangeCell(raw) {
  if (raw === '' || raw === undefined) return null
  const num = parseFloat(raw.replace(',', '.'))
  return isNaN(num) ? null : num
}

/**
 * Parse un fichier CSV en tableau de lignes enrichies.
 * Détecte automatiquement les colonnes booléennes : toutes les valeurs non-vides sont '0' ou '1'.
 * @param {string} csvContent
 * @param {Record<string, string>} [columnHints] - types déclarés dans le schéma, par nom de colonne
 * @returns {Record<string, unknown>[]}
 */
function parseCsv(csvContent, columnHints = {}) {
  const lines = csvContent.trim().split('\n').map((l) => l.trim())
  const headers = lines[0].split(';')
  const rawRows = lines.slice(1).filter((l) => l.length > 0).map((l) => l.split(';'))

  /** @type {Map<string, string[]>} */
  const rangeGroups = new Map()
  for (const h of headers) {
    const r = parseRangeHeader(h)
    if (r) {
      let group = rangeGroups.get(r.base)
      if (!group) { group = []; rangeGroups.set(r.base, group) }
      group.push(h)
    }
  }

  const rangeCols = new Set(headers.filter((h) => parseRangeHeader(h)))

  // Colonnes dont toutes les valeurs non-vides sont '0' ou '1' → boolean
  const booleanCols = new Set(
    headers.filter((h, i) => {
      if (rangeCols.has(h)) return false
      const nonEmpty = rawRows.map((r) => r[i] ?? '').filter((v) => v !== '')
      return nonEmpty.length > 0 && nonEmpty.every((v) => v === '0' || v === '1')
    })
  )

  return rawRows.map((values) => {
    /** @type {Record<string, unknown>} */
    const row = {}

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      if (rangeCols.has(header)) continue
      const raw = values[i] ?? ''
      if (booleanCols.has(header)) {
        row[header] = raw === '' ? null : raw === '1'
      } else if (
        (columnHints[header] ?? '').includes('string[]') &&
        !(columnHints[header] ?? '').includes('number')
      ) {
        row[header] = raw === '' ? null : [raw]
      } else {
        row[header] = parseCell(raw)
      }
    }

    for (const [base, cols] of rangeGroups) {
      /** @type {Record<string, number | null>} */
      const bounds = {}
      for (const col of cols) {
        const r = parseRangeHeader(col)
        if (!r) continue
        const idx = headers.indexOf(col)
        bounds[r.op] = parseRangeCell(values[idx] ?? '')
      }
      row[base] = bounds
    }

    return row
  })
}

/**
 * Déduit le type TypeScript d'une ligne à partir de l'ensemble des données.
 * Retourne un objet avec le type sous forme de chaîne et un flag indiquant si RangeBounds est utilisé.
 * @param {Record<string, unknown>[]} rows
 * @param {string} [relative] - utilisé dans les messages de warning
 * @param {Record<string, string>} [columnHints] - types déclarés dans le schéma, par nom de colonne
 * @returns {{ typeStr: string, usesRangeBounds: boolean }}
 */
function inferRowType(rows, relative, columnHints = {}) {
  if (rows.length === 0) return { typeStr: 'Record<string, unknown>', usesRangeBounds: false }

  /** @type {Map<string, Set<string>>} */
  const colTypes = new Map()

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      let types = colTypes.get(key)
      if (!types) { types = new Set(); colTypes.set(key, types) }

      if (value === null) types.add('null')
      else if (typeof value === 'boolean') types.add('boolean')
      else if (typeof value === 'number') types.add('number')
      else if (Array.isArray(value)) types.add('string[]')
      else if (typeof value === 'object') types.add('RangeBounds')
    }
  }

  let usesRangeBounds = false
  const fields = []
  for (const [key, types] of colTypes) {
    if (types.has('RangeBounds')) usesRangeBounds = true
    // Quoted key pour gérer les noms avec tirets (ex. u0-doublage)
    const inferredType = [...types].join(' | ')
    const declaredType = columnHints[key]
    if (declaredType) {
      if (declaredType !== inferredType) {
        console.warn(
          `[schema] ${relative}: "${key}" inféré "${inferredType}", déclaré "${declaredType}" — type déclaré utilisé`
        )
      }
      fields.push(`  "${key}": ${declaredType}`)
    } else {
      fields.push(`  "${key}": ${inferredType}`)
    }
  }

  return { typeStr: `{\n${fields.join('\n')}\n}`, usesRangeBounds }
}

const CHUNK_SIZE = 200

/**
 * Génère un fichier TypeScript de constante depuis un CSV.
 * Les données sont découpées en chunks de CHUNK_SIZE lignes pour éviter TS2590
 * (union type trop complexe sur les grands tableaux littéraux).
 * @param {string} csvPath - Chemin absolu du CSV source
 * @param {string} outPath - Chemin absolu du fichier TS généré
 * @param {string} relative - Chemin relatif du CSV depuis doctrine/abaques/
 */
function generateFromCsv(csvPath, outPath, relative) {
  const csvContent = readFileSync(csvPath, 'utf-8')
  const relativeKey = relative.replaceAll('\\', '/').replace(/\.csv$/, '')
  const columnHints = SCHEMA[relativeKey] ?? {}
  const rows = parseCsv(csvContent, columnHints)
  const sourcePath = csvPath.replaceAll('\\', '/')

  const { typeStr, usesRangeBounds } = inferRowType(rows, relativeKey, columnHints)

  // Chemin relatif vers filter.ts : autant de ../ que de segments dans relative (dir + data/)
  const depth = relative.split(/[/\\]/).length
  const filterImportPath = '../'.repeat(depth) + 'filter.js'

  const lines = [
    `// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement`,
    `// Source : ${sourcePath.slice(sourcePath.indexOf('doctrine/'))}`,
    ``,
  ]

  if (usesRangeBounds) {
    lines.push(`import type { RangeBounds } from '${filterImportPath}'`, ``)
  }

  lines.push(`type Row = ${typeStr}`, ``)

  // Découpage en chunks pour éviter TS2590 sur les grands abaques
  const chunks = []
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    chunks.push(rows.slice(i, i + CHUNK_SIZE))
  }

  if (chunks.length === 1) {
    lines.push(`const data: Row[] = ${JSON.stringify(chunks[0])}`, ``)
  } else {
    for (let i = 0; i < chunks.length; i++) {
      lines.push(`const chunk${i}: Row[] = ${JSON.stringify(chunks[i])}`, ``)
    }
    const chunkNames = chunks.map((_, i) => `...chunk${i}`).join(', ')
    lines.push(`const data: Row[] = [${chunkNames}]`, ``)
  }

  lines.push(`export type { Row }`, ``, `export default data`, ``)

  const content = lines.join('\n')

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, content, 'utf-8')
  console.log(`✓ ${outPath.replace(ROOT, '').replaceAll('\\', '/')}`)
}

/**
 * Retourne tous les fichiers CSV dans un répertoire, récursivement.
 * @param {string} dir
 * @returns {string[]}
 */
function findCsvFiles(dir) {
  /** @type {string[]} */
  const results = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      results.push(...findCsvFiles(fullPath))
    } else if (entry.endsWith('.csv')) {
      results.push(fullPath)
    }
  }
  return results
}

const DOCTRINE_ABAQUES = join(ROOT, 'doctrine', 'abaques')
const ENGINE_DATA = join(ROOT, 'packages', 'abaques', 'src', 'data')

const csvFiles = findCsvFiles(DOCTRINE_ABAQUES)

for (const csv of csvFiles) {
  const relative = csv.slice(DOCTRINE_ABAQUES.length + 1)
  const out = join(ENGINE_DATA, relative.replace(/\.csv$/, '.ts'))
  generateFromCsv(csv, out, relative)
}
