import fetch from 'unfetch'

const postRequest = ({ body, href }) => fetch(
  href,
  {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }
)

export default postRequest
