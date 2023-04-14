import { padStart } from 'lodash'

export const toDateInputString = ({ year, month }: { year: number; month: number }) =>
  `${padStart(String(year), 4, '0')}-${padStart(String(month), 2, '0')}-01`

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'short',
})
export const formatAsDate = (date: Date) => dateFormatter.format(date)

const monthYearFormatter = new Intl.DateTimeFormat('de-DE', {
  month: 'long',
  year: 'numeric',
})
export const formatAsMonthYear = (date: Date) => monthYearFormatter.format(date)

const euroFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
export const formatAsEuro = (number: number) => euroFormatter.format(number)
