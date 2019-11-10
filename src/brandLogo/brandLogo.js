import amex from './amex.svg'
import mastercard from './mc.svg'
import stripe from './stripe.svg'
import visa from './visa.svg'

const brandLogo = brand => ({
  amex,
  mastercard,
  visa
})[brand] || stripe

export default brandLogo
