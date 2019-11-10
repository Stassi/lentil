import amex from './amex.svg'
import discover from './discover.svg'
import mastercard from './mc.svg'
import stripe from './stripe.svg'
import visa from './visa.svg'

const brandLogo = brand => ({
  amex,
  discover,
  mastercard,
  visa
})[brand] || stripe

export default brandLogo
