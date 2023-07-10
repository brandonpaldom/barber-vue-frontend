import { parse, formatISO, parseISO, format } from 'date-fns'

export function formatDateToIso(date) {
  const parsedDate = parse(date, 'dd/MM/yyyy', new Date())
  return formatISO(parsedDate)
}

export function formatDate(date) {
  const parsedDate = parseISO(date)
  return format(parsedDate, 'PPPP')
}

export function formatDateToDDMMYYYY(date) {
  const parsedDate = parseISO(date)
  return format(parsedDate, 'dd/MM/yyyy')
}
