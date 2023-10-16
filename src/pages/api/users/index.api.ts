import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(404).end
  }

  const { name, username } = req.body

  // verifica se o username ja existe
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res
      .status(400)
      .json({ error: 'O nome de usuário não está disponível.' })
  }

  const user = await prisma.user.create({
    data: { name, username },
  })

  /* os cookies trafegam através do header da resposta */
  setCookie({ res }, '@dev-call:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(201).json(user)
}
