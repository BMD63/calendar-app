export function toParts(date) {
  const d = new Date(date)
  return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() }
}

export function fromParts(y, m, d) {
  return new Date(y, m, d)
}

export function pad2(n) {
  return String(n).padStart(2, '0')
}

export function formatYmd(date) {
  const { y, m, d } = toParts(date)
  return `${y}-${pad2(m + 1)}-${pad2(d)}`
}

export function normalizeDate(input) {
  if (!input) return null
  if (input instanceof Date) return new Date(input.getFullYear(), input.getMonth(), input.getDate())
  if (typeof input === 'string') {
    const m = input.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!m) return null
    const y = Number(m[1])
    const mm = Number(m[2]) - 1
    const dd = Number(m[3])
    return new Date(y, mm, dd)
  }
  return null
}

export function addDays(date, n) {
  const { y, m, d } = toParts(date)
  return new Date(y, m, d + n)
}

export function sameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isBetween(date, min, max, inclusive = true) {
  const t = fromParts(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const lo = min ? fromParts(min.getFullYear(), min.getMonth(), min.getDate()).getTime() : -Infinity
  const hi = max ? fromParts(max.getFullYear(), max.getMonth(), max.getDate()).getTime() : Infinity
  return inclusive ? (t >= lo && t <= hi) : (t > lo && t < hi)
}

export function clampDate(date, min, max) {
  if (min && date < min) return min
  if (max && date > max) return max
  return date
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function monthLabel(date, locale = '', options = { month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(locale || undefined, options).format(date)
}

/**
 * Получить подписи дней недели с учётом старта недели.
 * @param {string} locale
 * @param {0|1} startWeekOn - 0: Sunday, 1: Monday
 * @param {'narrow'|'short'|'long'} weekdayFormat
 */
export function getWeekdayLabels(locale = '', startWeekOn = 1, weekdayFormat = 'short') {
  const base = new Date(1970, 0, 4) // Sun
  const formatter = new Intl.DateTimeFormat(locale || undefined, { weekday: weekdayFormat })
  const labels = [...Array(7)].map((_, i) => {
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i)
    return formatter.format(d)
  })
  if (startWeekOn === 1) {
    return [...labels.slice(1), labels[0]]
  }
  return labels
}

/**
 * Рассчитать начало сетки календаря (дата в левой верхней ячейке)
 * @param {Date} viewMonthDate — любая дата внутри отображаемого месяца
 * @param {0|1} startWeekOn
 */
export function getGridStart(viewMonthDate, startWeekOn = 1) {
  const first = startOfMonth(viewMonthDate)
  // JS: 0=Sunday..6=Saturday
  const jsDay = first.getDay()
  const offset = (jsDay - startWeekOn + 7) % 7
  return addDays(first, -offset)
}
