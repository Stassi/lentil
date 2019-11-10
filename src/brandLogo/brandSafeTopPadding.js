import heightToWidthPercentage from '../utility/heightToWidthPercentage'

const brandSafeTopPadding = {
  paddingTop: ({ brand }) => heightToWidthPercentage(({
    amex: {
      height: 997.51703,
      width: 1000
    },
    diners: {
      height: 504,
      width: 1945
    },
    discover: {
      height: 21.356791,
      width: 126.85181
    },
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
