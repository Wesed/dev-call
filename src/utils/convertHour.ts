export function convertHour(hour: number) {
  if (Number.isInteger(hour)) {
    return `${String(hour).padStart(2, '0')}:00`
  } else {
    const hourFormated = Math.floor(hour)
    return `${String(hourFormated).padStart(2, '0')}:30`
  }
}
