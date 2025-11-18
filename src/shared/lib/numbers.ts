// Format number with commas (e.g., 1000000 -> "1,000,000")
export function formatWithCommas(num: number): string {
  return num.toLocaleString()
}

// Format number as currency (USD, EUR, EGP, etc.)
export function formatCurrency(num: number, currency: string = "EGP", locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(num)
}

// Format number as percentage
export function formatPercentage(num: number, fractionDigits: number = 2): string {
  return `${(num * 100).toFixed(fractionDigits)}%`
}

// Round number to given decimals
export function roundTo(num: number, decimals: number = 2): number {
  return parseFloat(num.toFixed(decimals))
}

// Abbreviate large numbers (1000 -> "1K", 1000000 -> "1M")
export function abbreviateNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
  return num.toString()
}

// Parse a string to number safely
export function safeParseNumber(str: any, fallback: number = 0): number {
  if (str === null || str === undefined) return fallback
  const num = Number(str)
  return isNaN(num) ? fallback : num
}

// Check if value is a valid number
export function isNumeric(value: any): boolean {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

// Clamp a number between min and max
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

// Generate random number between min and max
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Add ordinal suffix (1 -> "1st", 2 -> "2nd", 3 -> "3rd")
export function addOrdinal(num: number): string {
  const suffixes = ["th", "st", "nd", "rd"]
  const v = num % 100
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}
