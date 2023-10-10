import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter no mínimo 3 letras' })
    .regex(/^(?=[a-z-]*[a-z]){3,}(?!.*-{3,})[a-z-]*$/i, {
      message: 'O usuário deve ter somente letras e hifens',
    })
    .transform((username) => username.toLowerCase()),

  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 letras.' })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
      message: 'Verifique o nome digitado.',
    }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Dev Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="dev.com/"
            placeholder="seu usuário"
            crossOrigin="anonymous"
            {...register('username')}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            placeholder="seu nome"
            crossOrigin="anonymous"
            {...register('name')}
          />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
