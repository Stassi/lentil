import heightToWidthPercentage from '../utility/heightToWidthPercentage'

const brandSafeTopPadding = {
  paddingTop: ({ brand }) => heightToWidthPercentage(({
    mastercard: {
      height: 120.41,
      width: 146.8
    },
    visa: {
      height: 323.653,
      width: 1000.046
    }
  })[brand] || {
    height: 222.5,
    width: 468
  })
}

export default brandSafeTopPadding
