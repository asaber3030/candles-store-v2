import moment from "moment"
import { format as formatDateFns, formatDistanceToNow, addDays, addMonths, subDays, subMonths, parseISO, differenceInDays, differenceInHours, differenceInMinutes, isBefore, isAfter, isToday, isYesterday, isTomorrow, startOfDay, endOfDay } from "date-fns"

// ==========================
// Moment.js Utils (locales, RTL)
// ==========================

/**
 * Format date using Moment.js with localization
 */
export function formatMoment(date: Date | string | number, format = "YYYY-MM-DD", locale: "en" | "ar" = "en"): string {
  return moment(date).locale(locale).format(format)
}

export function diffForHumans(date: Date) {
  return moment(date).fromNow()
}

/**
 * Human readable time ago (e.g. "5 minutes ago" / "منذ ٥ دقائق")
 */
export function timeAgo(date: Date | string | number, locale: "en" | "ar" = "en"): string {
  return moment(date).locale(locale).fromNow()
}

/**
 * Returns start and end of day
 */
export function getDayRange(date: Date | string | number) {
  return {
    start: moment(date).startOf("day").toDate(),
    end: moment(date).endOf("day").toDate()
  }
}

// ==========================
// date-fns Utils (performance, tree-shakeable)
// ==========================

/**
 * Format date using date-fns (lighter than moment)
 */
export function formatDate(date: Date | string | number, format = "yyyy-MM-dd"): string {
  return formatDateFns(new Date(date), format)
}

/**
 * Get distance to now (e.g. "2 hours ago")
 */
export function formatDistance(date: Date | string | number): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/**
 * Parse ISO string safely
 */
export function parseDate(dateString: string): Date {
  return parseISO(dateString)
}

/**
 * Add/subtract utilities
 */
export const addDaysToDate = (date: Date, days: number) => addDays(date, days)
export const addMonthsToDate = (date: Date, months: number) => addMonths(date, months)
export const subDaysFromDate = (date: Date, days: number) => subDays(date, days)
export const subMonthsFromDate = (date: Date, months: number) => subMonths(date, months)

/**
 * Difference calculations
 */
export const diffInDays = (a: Date, b: Date) => differenceInDays(a, b)
export const diffInHours = (a: Date, b: Date) => differenceInHours(a, b)
export const diffInMinutes = (a: Date, b: Date) => differenceInMinutes(a, b)

/**
 * Comparisons
 */
export const isBeforeDate = (a: Date, b: Date) => isBefore(a, b)
export const isAfterDate = (a: Date, b: Date) => isAfter(a, b)
export const isTodayDate = (date: Date) => isToday(date)
export const isYesterdayDate = (date: Date) => isYesterday(date)
export const isTomorrowDate = (date: Date) => isTomorrow(date)

/**
 * Day boundaries
 */
export const startOfDayDate = (date: Date) => startOfDay(date)
export const endOfDayDate = (date: Date) => endOfDay(date)

// ==========================
// Helpers (hybrid usage)
// ==========================

/**
 * Format date depending on language
 */
export function formatLocalized(date: Date | string | number, language: "en" | "ar" = "en", format: string = "YYYY-MM-DD") {
  return formatMoment(date, format, language)
}

/**
 * Returns relative time (prefers moment for locale support)
 */
export function formatRelative(date: Date | string | number, language: "en" | "ar" = "en"): string {
  return timeAgo(date, language)
}
