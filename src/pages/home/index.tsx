import { Heading, Text } from '@ignite-ui/react'
import calendarBackground from '@/assets/calendar.png'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Dev Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={calendarBackground}
            alt="Calendário de exemplo da aplicação"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
