const createScript = ({
  async,
  document,
  onload,
  src
}) => {
  const el = document.createElement('script')
  el.async = async
  el.onload = onload
  el.src = src
  return el
}

export default createScript
