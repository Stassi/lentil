import amex from './amex.svg'
import diners from './diners.svg'
import discover from './discover.svg'
import jcb from './jcb.svg'
import mastercard from './mc.svg'
import stripe from './stripe.svg'
import visa from './visa.svg'

const brandLogo = brand => ({
  amex,
  diners,
  discover,
  jcb,
  mastercard,
  visa
})[brand] || stripe

export default brandLogo
