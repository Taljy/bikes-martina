export function formatChf(n: number): string {
  return "CHF " + n.toLocaleString('de-CH')
}

export function formatEur(n: number): string {
  return "EUR " + n.toLocaleString('de-CH')
}

export function motorKurzname(hersteller: string, modell: string): string {
  if (hersteller === 'Bosch') return 'Bosch CX Gen5'
  if (hersteller === 'Shimano') return 'Shimano EP801'
  if (hersteller === 'DJI') return 'DJI Avinox M1'
  if (hersteller === 'Fazua') return 'Fazua Ride 60'
  if (hersteller === 'TQ') return 'TQ HPR50'
  if (hersteller === 'Yamaha') return 'Yamaha'
  if (hersteller === 'Specialized') return 'Specialized'
  return `${hersteller} ${modell}`.trim()
}

export function materialKurz(material: string): string {
  if (material.startsWith('Carbon')) return 'Carbon'
  if (material === 'Aluminium') return 'Alu'
  return material
}
