import express from 'express'
import fs from "fs"

const app = express()
const port = 50401

app.use(function (_, res, next) {
  if (process.env.NODE_ENV === 'development') {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  }

  next();
});

app.use(express.json())

app.get('/bruh.csv', (_, res) => {
  const file = fs.readFileSync('data/bruh.csv', { encoding: 'utf-8' })
  res.send(file)
})

app.post('/new', (req, res) => {
  const body = req.body
  let sign = ''

  if (body.io !== 'доход') {
    sign = '-'
  }

  // проверка нужна чтобы не было ошибки
  const subCategory = (body.subCategory || '').toLowerCase()

  const newLine = `${body.category},${subCategory},${body.io},${body.date},${sign}${body.inputValue}\n`
  fs.appendFileSync('data/bruh.csv', newLine, { encoding: 'utf-8' })

  res.status(200).end()
})

app.delete('/deleteLastRow', (_, res) => {

  const file = fs.readFileSync('data/bruh.csv', { encoding: 'utf-8' })
    .split('\n')
    .slice(0, -2)
    .join('\n')
    .concat('\n')


  fs.writeFileSync('data/bruh.csv', file)
  res.status(200).end()
})

app.use(express.static('dist'))

app.listen(port, '0.0.0.0',
  () => {
  console.log(`Example app listening at http://localhost:${port}`)
}
)

