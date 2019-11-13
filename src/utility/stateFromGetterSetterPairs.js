import reduce from './reduce'

const stateFromGetterSetterPairs = pairs => ([getters, setState]) => {
  const setterAttribute = ([getter, setter]) => ({
    [setter]: value => setState(prevState => ({ ...prevState, [getter]: value }))
  })

  const setters = reduce((acc, val) => ({ ...acc, ...setterAttribute(val) }), {})

  return ({
    ...getters,
    ...setters(pairs)
  })
}

export default stateFromGetterSetterPairs
