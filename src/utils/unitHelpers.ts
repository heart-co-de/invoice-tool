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

// UnitQuantity
export const unitQuantitySchema = z.enum(['Stunde', 'Monat', 'Stück'])
export type UnitQuantity = z.infer<typeof unitQuantitySchema>
const unitVariations = {
  Stunde: { singular: 'Stunde', plural: 'Stunden', isPerHour: true },
  Monat: { singular: 'Monat', plural: 'Monate', isPerHour: false },
  Stück: { singular: 'Stück', plural: 'Stück', isPerHour: false },
} satisfies Record<UnitQuantity, { singular: string; plural: string; isPerHour: boolean }>
const pluralizeUnitQuantity = (unitQuantity: UnitQuantity, count: number) => {
  const { singular, plural } = unitVariations[unitQuantity]
  return count === 1 ? singular : plural
}
const isUnitQuantityPerHour = (unitQuantity: UnitQuantity) => unitVariations[unitQuantity].isPerHour
const hourFormatter = new Intl.DateTimeFormat('de-DE', {
  hour: '2-digit',
  minute: '2-digit',
})

export const formatQuantity = (count: number, unitQuantity: UnitQuantity) =>
  isUnitQuantityPerHour(unitQuantity)
    ? hourFormatter.format(new Date(0, 0, 0, count, 60 * (count % 1)))
    : count
export const formatUnit = (count: number, unitQuantity: UnitQuantity) =>
  pluralizeUnitQuantity(unitQuantity, count)

export const formatUnitQuantity = (count: number, unitQuantity: UnitQuantity) =>
  `${formatQuantity(count, unitQuantity)} ${formatUnit(count, unitQuantity)}`
