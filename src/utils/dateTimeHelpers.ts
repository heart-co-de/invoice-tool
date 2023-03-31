import { padStart } from 'lodash'

export const toDateInputString = ({ year, month }: { year: number; month: number }) =>
  `${padStart(String(year), 4, '0')}-${padStart(String(month), 2, '0')}-01`
