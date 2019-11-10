import heightToWidthPercentage from '../utility/heightToWidthPercentage'
import logoDimensions from './logoDimensions'

const {
  stripe: stripeDimensions,
  ...cardLogos
} = logoDimensions

const brandSafeTopPadding = {
  paddingTop: ({ brand }) =>
    heightToWidthPercentage((cardLogos)[brand] || stripeDimensions)
}

export default brandSafeTopPadding
