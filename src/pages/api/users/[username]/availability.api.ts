import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date no provided.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' })
  }

  const referenceDate = dayjs(String(date))

  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  // se a data estiver no passado, retorna um array vazio (sem disponibilidade)
  if (isPastDate) {
    return res.status(200).json({ possibleTimes: [], availability: [] })
  }

  // se o dia escolhido tiver disponibilidade
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.status(200).json({ possibleTimes: [], availability: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60 // 08:00
  const endHour = time_end_in_minutes / 60 // 18:00

  const possibleTimes = Array.from({ length: (endHour - startHour) * 2 }).map(
    (_, i) => {
      return startHour + i * 0.5
    },
  )

  // retorna todos os agendamentos
  const blockedTimes = await prisma.scheduling.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  // retorna somente os horários que nao estão no blockedTimes
  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some((blockedTime) => {
      const blockedHours = blockedTime.date.getHours()
      const blockedMinutes = blockedTime.date.getMinutes()
      const timeHours = Math.floor(time)
      const timeMinutes = (time - timeHours) * 60

      return (
        blockedHours === timeHours &&
        blockedMinutes >= timeMinutes &&
        blockedMinutes < timeMinutes + 30
      )
    })

    // verifica se a hora ja passou e o dia é o mesmo
    const currentTime = dayjs()
    const currentHours = Math.floor(time)
    const currentMinutes = Math.floor((time - currentHours) * 60)

    const compareTime = currentTime
      .set('hour', currentHours)
      .set('minute', currentMinutes)

    const isSameDay = currentTime.isSame(referenceDate, 'day')

    // se a hora ja passou E o dia é o mesmo, retorna
    const isTimeInPast = compareTime.isBefore(currentTime) && isSameDay

    // so retorna horários disponíveis e que nao passaram
    return !isTimeBlocked && !isTimeInPast
  })

  return res.json({ possibleTimes, availableTimes })
}
