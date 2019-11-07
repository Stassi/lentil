const socketListener = port => err => {
  if (err) throw err
  console.log(`[ server ] Ready on http://localhost:${port}`)
}

export default socketListener
