import createScript from '../utility/createScript'

const appendClientScriptToBody = ({ document, onload }) => {
  const script = createScript({
    document,
    onload,
    async: true,
    src: 'https://js.stripe.com/v3/'
  })

  document.body.appendChild(script)

  return script
}

export default appendClientScriptToBody
