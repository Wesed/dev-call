import { Box, TextInput, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$4',
  padding: '$4',
  outline: 0,

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})
