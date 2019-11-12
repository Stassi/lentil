import postRequest from '../../utility/postRequest'

const client = body => postRequest({ body, href: '/api/createCharge' })

export default client
