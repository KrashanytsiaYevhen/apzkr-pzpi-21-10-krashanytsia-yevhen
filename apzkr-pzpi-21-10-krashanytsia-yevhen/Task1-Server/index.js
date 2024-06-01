require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = 3001
const cors = require('cors')
const router = require('./routes/index')
const errorHeandler = require('./middleware/ErrorHandlingMiddleware')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)



app.use(errorHeandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
module.exports = app;