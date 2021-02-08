const express = require('express')
const routers = require('./routes/index_router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/', routers.routerLogin)
app.use('/api/', routers.routerUser)
app.use('/api/', routers.routerRefresh)

const PORT = 3000
app.listen(PORT, () => {
  console.log('listen on port: ', PORT)
})
