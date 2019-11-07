const serve = async ({
  app,
  onReady,
  ...props
}) => {
  await app.prepare()
  onReady({ app, ...props })
}

export default serve
