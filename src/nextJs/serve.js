const serve = async ({
  app,
  onReady,
  ...props
}) => {
  await app.prepare()

  onReady({
    defaultRouteHandler: app.getRequestHandler(),
    ...props
  })
}

export default serve
