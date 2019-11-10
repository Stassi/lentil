import amex from './amex.svg'
import diners from './diners.svg'
import discover from './discover.svg'
import jcb from './jcb.svg'
import mastercard from './mc.svg'
import stripe from './stripe.svg'
import unionpay from './unionpay.svg'
import visa from './visa.svg'

const brandLogo = brand => ({
  amex,
  diners,
  discover,
  jcb,
  mastercard,
  unionpay,
  visa
})[brand] || stripe

export default brandLogo
