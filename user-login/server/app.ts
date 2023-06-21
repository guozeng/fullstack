import Express from 'express'

const app = Express()
const port = 3000

app.get('/', (req, res) => {
  res.end('hello world')
})

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
