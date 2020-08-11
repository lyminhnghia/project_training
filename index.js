const express = require('express')
const app = express()

app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()

require('./server/routes/route')(app)
const db = require('./server/configs/db.config')

db.sequelize.sync().then(() => {
    console.log("Sequelize is Running")
}).catch(err => {
    console.log(err.message)
})

app.get("/", function (req, res) {
    res.send("Server is running!")
})

const port = process.env.PORT || 5000
app.listen(port)