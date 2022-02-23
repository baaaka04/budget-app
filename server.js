import express from 'express'
import fs from "fs"

const app = express()
const port = 5040

app.use(function(_, res, next) {
  if (process.env.NODE_ENV === 'development') {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
  }

  next();
});

app.use(express.json())

app.get('/ripen/bruh.csv', (_, res) => {
  const file = fs.readFileSync('data/bruh.csv', {encoding:'utf-8'})
  res.send(file)
})

app.post('/ripen/new', (req, res) => {
  const body = req.body
  console.log(body)
  let sign = ''
  
  if (body.io !== 'доход' ) {
    sign = '-'
  }

  // проверка нужна чтобы не было ошибки
  const subCategory = (body.subCategory || '').toLowerCase()
  
  const newLine = `${body.category},${subCategory},${body.io},${body.date},${sign}${body.sum}\n`
  fs.appendFileSync('data/bruh.csv', newLine, {encoding:'utf-8'})

  res.status(200).end()
})

app.use('/ripen', express.static('dist'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
