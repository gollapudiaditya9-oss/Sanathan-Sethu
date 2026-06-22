const ordinalSuffix = (day: number) => {
  const remainder = day % 100
  if (remainder >= 11 && remainder <= 13) return 'th'

  if (day % 10 === 1) return 'st'
  if (day % 10 === 2) return 'nd'
  if (day % 10 === 3) return 'rd'
  return 'th'
}

export const getBookingDateParts = (value?: string | Date | null) => {
  if (!value) return null

  const date = value instanceof Date
    ? value
    : (() => {
        const [year, month, day] = value.split('-').map(Number)
        return new Date(year, month - 1, day)
      })()

  if (Number.isNaN(date.getTime())) return null

  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  const day = date.getDate()

  return {
    weekday,
    day,
    suffix: ordinalSuffix(day),
    month,
    year: date.getFullYear()
  }
}

export const formatBookingDate = (value?: string | Date | null) => {
  const parts = getBookingDateParts(value)
  if (!parts) return ''

  return `${parts.weekday}, ${parts.day}${parts.suffix} ${parts.month}, ${parts.year}`
}
