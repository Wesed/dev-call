import { Checkbox, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalItem,
  IntervalDay,
  IntervalInputs,
  IntervalContainer,
} from './styles'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput
                size="sm"
                type="time"
                step={30}
                crossOrigin="anonymous"
              />
              <TextInput
                size="sm"
                type="time"
                step={30}
                crossOrigin="anonymous"
              />
            </IntervalInputs>
          </IntervalItem>

          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput
                size="sm"
                type="time"
                step={30}
                crossOrigin="anonymous"
              />
              <TextInput
                size="sm"
                type="time"
                step={30}
                crossOrigin="anonymous"
              />
            </IntervalInputs>
          </IntervalItem>
        </IntervalContainer>
      </IntervalBox>
    </Container>
  )
}
