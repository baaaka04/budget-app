import express from 'express'
import fs from "fs"
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()
const port = 5040

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json())
app.use(cors({credentials: true, origin: "*"}))

app.get('/bruh.csv', (_, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  const file = fs.readFileSync('data/bruh.csv', {encoding:'utf-8'})
  res.send(file)
})

app.post('/new', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  const body = req.body
  console.log(body)
  let sign = ''
  
  if (body.io !== 'доход' ) {
    sign = '-'
  }

  // проверка нужна чтобы не было ошибки
  const subCategory = (body.subCategory || '').toLowerCase()
  
  const newLine = `\n${body.category},${subCategory},${body.io},${body.date},${sign}${body.sum}`
  fs.appendFileSync('data/bruh.csv', newLine, {encoding:'utf-8'})
  // console.log(req.body)

  // res.send('ok')
  res.status(200).end()
  // res.redirect('./')
})


app.use(express.static('dist'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

