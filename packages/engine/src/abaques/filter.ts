export type RangeBounds = {
  eq?: number | null
  gte?: number | null
  gt?: number | null
  lte?: number | null
  lt?: number | null
}

export type AbaqueQuery = Record<string, string | number | boolean>

function isRangeBounds(cell: unknown): cell is RangeBounds {
  return (
    typeof cell === 'object' &&
    cell !== null &&
    !Array.isArray(cell) &&
    ('eq' in cell || 'gte' in cell || 'gt' in cell || 'lte' in cell || 'lt' in cell)
  )
}

function normalizeQuery(queryValue: string | number | boolean): string | number {
  return typeof queryValue === 'boolean' ? (queryValue ? 1 : 0) : queryValue
}

function matchesRangeBounds(value: number, bounds: RangeBounds): boolean {
  if (bounds.eq !== null && bounds.eq !== undefined && value !== bounds.eq) return false
  if (bounds.gte !== null && bounds.gte !== undefined && value < bounds.gte) return false
  if (bounds.gt !== null && bounds.gt !== undefined && value <= bounds.gt) return false
  if (bounds.lte !== null && bounds.lte !== undefined && value > bounds.lte) return false
  if (bounds.lt !== null && bounds.lt !== undefined && value >= bounds.lt) return false
  return true
}

function matchesCellArray(cell: string[], queryValue: string | number | boolean): boolean {
  const normalized = String(normalizeQuery(queryValue))
  return cell.some((v) => v === normalized)
}

function matchesCellScalar(cell: string | number, queryValue: string | number | boolean): boolean {
  const normalized = normalizeQuery(queryValue)
  return cell === normalized || String(cell) === String(normalized)
}

// Vérifie qu'une ligne satisfait l'ensemble des critères de la query.
// Détection par type de cellule : RangeBounds → filtre range, string[] → filtre match,
// null/undefined → wildcard, scalaire → égalité directe.
function rowMatchesQuery(row: Record<string, unknown>, query: AbaqueQuery): boolean {
  for (const [key, queryValue] of Object.entries(query)) {
    const cell = row[key]

    if (cell === null || cell === undefined) continue

    if (isRangeBounds(cell)) {
      const num = Number(queryValue)
      if (isNaN(num)) return false
      if (!matchesRangeBounds(num, cell)) return false
    } else if (Array.isArray(cell)) {
      if (!matchesCellArray(cell as string[], queryValue)) return false
    } else {
      if (!matchesCellScalar(cell as string | number, queryValue)) return false
    }
  }
  return true
}

export function search<S extends object>(rows: S[], query: AbaqueQuery): S[] {
  return rows.filter((row) => rowMatchesQuery(row as Record<string, unknown>, query))
}

export function find<S extends object>(rows: S[], query: AbaqueQuery): S | null {
  return search(rows, query)[0] ?? null
}
