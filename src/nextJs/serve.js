const serve = async ({
  app,
  onReady,
  ...props
}) => {
  await app.prepare()
  const defaultRouteHandler = app.getRequestHandler()
  onReady({ defaultRouteHandler, ...props })
}

export default serve
