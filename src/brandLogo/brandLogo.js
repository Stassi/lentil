import amex from './amex.svg'
import diners from './diners.svg'
import discover from './discover.svg'
import mastercard from './mc.svg'
import stripe from './stripe.svg'
import visa from './visa.svg'

const brandLogo = brand => ({
  amex,
  diners,
  discover,
  mastercard,
  visa
})[brand] || stripe

export default brandLogo
