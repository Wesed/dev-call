import { Heading, Text } from '@ignite-ui/react'
import calendarBackground from '@/assets/calendar.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20">
      {/* hero */}
      <div className="max-w-[480px] px-10 py-0">
        <Heading className="!text-4xl md:!text-6xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl" className="!mt-2 !text-gray200-value">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </div>
      {/* preview */}
      <div className="hidden overflow-hidden pr-8 md:flex">
        <Image
          src={calendarBackground}
          alt="Calendário de exemplo da aplicação"
          height={400}
          quality={100}
          priority
          className="min-w-[750px]"
        />
      </div>
    </div>
  )
}
