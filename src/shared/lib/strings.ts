export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Convert string to Title Case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ")
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^(.)/, (c) => c.toLowerCase())
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

/**
 * Convert string to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase()
}

/**
 * Slugify for URLs (with optional separator)
 */
export function slugify(str: string, separator: string = "-"): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, separator)
    .replace(/^-+|-+$/g, "")
}

export function generateSKU(name: string): string {
  const prefix = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "") // keep letters/numbers only
    .slice(0, 3) // take first 3 chars

  const random = Math.floor(10000 + Math.random() * 90000) // 5-digit random

  return `${prefix}-${random}`
}

/**
 * Truncate a string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "…"
}

/**
 * Remove extra spaces (normalize)
 */
export function normalizeSpaces(str: string): string {
  return str.replace(/\s+/g, " ").trim()
}

/**
 * Reverse a string
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("")
}

/**
 * Check if string is empty or only spaces
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0
}

/**
 * Mask string (useful for emails, credit cards)
 */
export function mask(str: string, visibleStart: number = 2, visibleEnd: number = 2): string {
  if (str.length <= visibleStart + visibleEnd) return str
  return str.slice(0, visibleStart) + "*".repeat(str.length - (visibleStart + visibleEnd)) + str.slice(str.length - visibleEnd)
}

/**
 * Validate email
 */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

/**
 * Validate URL
 */
export function isUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/**
 * Random string generator (for IDs, tokens)
 */
export function randomString(length: number = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^*(&())_+{}|:<>?-=[];',./"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

/**
 * Count occurrences of substring in string
 */
export function countOccurrences(str: string, subStr: string): number {
  return str.split(subStr).length - 1
}
/**
 * Check if string starts with a vowel
 */
export function startsWithVowel(str: string): boolean {
  return /^[aeiou]/i.test(str.trim())
}
/**
 * Check if string ends with a vowel
 */ export function endsWithVowel(str: string): boolean {
  return /[aeiou]$/i.test(str.trim())
}
/**
 * Pluralize a word based on count
 */
export function pluralize(word: string, count: number): string {
  return count === 1 ? word : word.endsWith("s") ? word : word + "s"
}
