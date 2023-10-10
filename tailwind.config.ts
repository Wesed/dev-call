import type { Config } from 'tailwindcss'
import { theme } from '@ignite-ui/react'

const { colors, fontSizes, fontWeights, fonts, lineHeights, radii, space } =
  theme

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors,
    fontSizes,
    fontWeight: {
      regular: fontWeights.regular,
      medium: fontWeights.medium,
      bold: fontWeights.bold,
    },
    fontFamily: fonts,
    lineHeights,
    radii,
    space,
  },
  plugins: [],
}
export default config
