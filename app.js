const express = require('express')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})