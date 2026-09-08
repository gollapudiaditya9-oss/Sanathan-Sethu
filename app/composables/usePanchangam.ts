import {
  getPanchangam,
  getUpcomingFestivals,
  nakshatraNames,
  Observer,
  tithiNames,
  yogaNames
} from '@ishubhamx/panchangam-js'

const HYDERABAD_TIME_ZONE = 'Asia/Kolkata'
const HYDERABAD_TIME_ZONE_OFFSET = 330
const HYDERABAD_OBSERVER = new Observer(17.385, 78.4867, 542)

const panchangamOptions = {
  timezoneOffset: HYDERABAD_TIME_ZONE_OFFSET,
  calendarType: 'amanta' as const
}

const makeCalculationDate = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month, day, 6, 30))

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: HYDERABAD_TIME_ZONE
})

const festivalDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  timeZone: HYDERABAD_TIME_ZONE
})

const formatTime = (date: Date | null) => date ? timeFormatter.format(date) : 'Not applicable'

const formatTimeRange = (range: { start: Date, end: Date } | null) =>
  range ? `${formatTime(range.start)}–${formatTime(range.end)}` : 'Not applicable'

export const getHyderabadToday = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: HYDERABAD_TIME_ZONE
  }).formatToParts(new Date())
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find(part => part.type === type)?.value)

  return {
    year: value('year'),
    month: value('month') - 1,
    day: value('day')
  }
}

export const getPanchangForDate = (year: number, month: number, day: number) => {
  const calculationDate = makeCalculationDate(year, month, day)
  const result = getPanchangam(calculationDate, HYDERABAD_OBSERVER, panchangamOptions)

  return {
    date: calculationDate,
    tithi: tithiNames[result.tithi],
    nakshatra: nakshatraNames[result.nakshatra],
    yoga: yogaNames[result.yoga],
    karana: result.karana,
    paksha: result.paksha,
    masa: `${result.masa.isAdhika ? 'Adhika ' : ''}${result.masa.name}`,
    ritu: result.ritu,
    ayana: result.ayana,
    samvatsara: result.samvat.samvatsara,
    sunrise: formatTime(result.sunrise),
    sunset: formatTime(result.sunset),
    tithiEnds: formatTime(result.tithiEndTime),
    nakshatraEnds: formatTime(result.nakshatraEndTime),
    yogaEnds: formatTime(result.yogaEndTime),
    abhijitMuhurta: formatTimeRange(result.abhijitMuhurta),
    rahuKalam: result.rahuKalamStart && result.rahuKalamEnd
      ? `${formatTime(result.rahuKalamStart)}–${formatTime(result.rahuKalamEnd)}`
      : 'Not applicable',
    festivals: result.festivals
  }
}

export const getUpcomingPanchangFestivals = (year: number, month: number, day: number, days = 30) =>
  getUpcomingFestivals({
    date: makeCalculationDate(year, month, day),
    observer: HYDERABAD_OBSERVER,
    days,
    ...panchangamOptions
  }).map(festival => ({
    ...festival,
    dateLabel: festivalDateFormatter.format(festival.date)
  }))

