import Express from 'express'

const app = Express()
const port = 3000

app.get('/', (req, res) => {
  res.end('hello world11')
})

app.listen(port, '172.18.3.163', () => {
  console.log(`Server running at ${port}`)
})
