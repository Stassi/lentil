import {
  amex,
  diners,
  discover,
  jcb,
  mastercard,
  stripe,
  unionpay,
  visa
} from './logos'

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
