const express = require('express')
const router = require('./routes/index_router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

const PORT = 3000
app.listen(PORT, () => {
  console.log('listen on port: ', PORT)
})
