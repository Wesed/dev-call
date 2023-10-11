import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  /* explicacao
    obtem a query da url e seta no campo, pro usuario nao ter q digitar dnv
    nesse cenario, se o usuario modificar o username na url, reflete no campo
  */

  useEffect(() => {
    if (router.query.username) {
      setValue('username', router.query.username as string)
    }
  }, [router.query.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data) {
        alert(err.response.data.error)
        return
      }

      console.log(err)
    }
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Carregando...' : 'Próximo passo'}
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
