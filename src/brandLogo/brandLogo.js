import amex from './logos/amex.svg'
import diners from './logos/diners.svg'
import discover from './logos/discover.svg'
import jcb from './logos/jcb.svg'
import mastercard from './logos/mastercard.svg'
import stripe from './logos/stripe.svg'
import unionpay from './logos/unionpay.svg'
import visa from './logos/visa.svg'

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
