export interface Filters {
  preisMin: number
  preisMax: number
  motoren: string[]      // 'bosch' | 'shimano' | 'dji' | 'andere'
  kategorien: string[]   // 'Trail' | 'All-Mountain' | 'Enduro'
  federwegMin: number
  federwegMax: number
  materialien: string[]  // 'carbon' | 'alu'
  gewichtMax: number
  laufraeder: string[]   // '29' | 'mx' | '27.5'
  nurBudget: boolean
  nurScoreMin7: boolean
  sort: string
}

export const DEFAULTS: Filters = {
  preisMin: 3000,
  preisMax: 13000,
  motoren: [],
  kategorien: [],
  federwegMin: 140,
  federwegMax: 180,
  materialien: [],
  gewichtMax: 28,
  laufraeder: [],
  nurBudget: false,
  nurScoreMin7: false,
  sort: 'score-desc',
}

export function parseFilters(params: URLSearchParams): Filters {
  return {
    preisMin: Number(params.get('preis_min') ?? DEFAULTS.preisMin),
    preisMax: Number(params.get('preis_max') ?? DEFAULTS.preisMax),
    motoren: params.get('motor')?.split(',').filter(Boolean) ?? [],
    kategorien: params.get('kat')?.split(',').filter(Boolean) ?? [],
    federwegMin: Number(params.get('fw_min') ?? DEFAULTS.federwegMin),
    federwegMax: Number(params.get('fw_max') ?? DEFAULTS.federwegMax),
    materialien: params.get('mat')?.split(',').filter(Boolean) ?? [],
    gewichtMax: Number(params.get('kg_max') ?? DEFAULTS.gewichtMax),
    laufraeder: params.get('rad')?.split(',').filter(Boolean) ?? [],
    nurBudget: params.get('budget') === '1',
    nurScoreMin7: params.get('score7') === '1',
    sort: params.get('sort') ?? DEFAULTS.sort,
  }
}

export function filtersToParams(f: Filters): Record<string, string> {
  const p: Record<string, string> = {}
  if (f.preisMin !== DEFAULTS.preisMin) p.preis_min = String(f.preisMin)
  if (f.preisMax !== DEFAULTS.preisMax) p.preis_max = String(f.preisMax)
  if (f.motoren.length) p.motor = f.motoren.join(',')
  if (f.kategorien.length) p.kat = f.kategorien.join(',')
  if (f.federwegMin !== DEFAULTS.federwegMin) p.fw_min = String(f.federwegMin)
  if (f.federwegMax !== DEFAULTS.federwegMax) p.fw_max = String(f.federwegMax)
  if (f.materialien.length) p.mat = f.materialien.join(',')
  if (f.gewichtMax !== DEFAULTS.gewichtMax) p.kg_max = String(f.gewichtMax)
  if (f.laufraeder.length) p.rad = f.laufraeder.join(',')
  if (f.nurBudget) p.budget = '1'
  if (f.nurScoreMin7) p.score7 = '1'
  if (f.sort !== DEFAULTS.sort) p.sort = f.sort
  return p
}
