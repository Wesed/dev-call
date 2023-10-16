import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { useSession } from 'next-auth/react'
import { FormAnnotation, ProfileBox } from './styles'
import { ArrowRight } from 'phosphor-react'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })
  }

  async function handleNavigateToNextStep() {
    await router.push(`/schedule/${session.data?.user.username}`)
  }
  
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Dev Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button
          onClick={handleNavigateToNextStep}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Finalizando...' : 'Finalizar'}
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return {
      redirect: {
        destination: '/register/connect-calendar',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
