import { padStart } from 'lodash'
import { z } from 'zod'

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

export const unitQuantitySchema = z.enum(['Stunde', 'Monat'])
export type UnitQuantity = z.infer<typeof unitQuantitySchema>
const unitVariations = {
  Stunde: { singular: 'Stunde', plural: 'Stunden' },
  Monat: { singular: 'Monat', plural: 'Monate' },
} satisfies Record<UnitQuantity, { singular: string; plural: string }>
export const pluralizeUnitQuantity = (unitQuantity: UnitQuantity, count: number) => {
  const { singular, plural } = unitVariations[unitQuantity]
  return count === 1 ? singular : plural
}
