import stripe from './stripe.svg'
import mastercard from './mc.svg'
import visa from './visa.svg'

const brandLogo = brand => ({ mastercard, visa })[brand] || stripe

export default brandLogo
