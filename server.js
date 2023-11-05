const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const UserRoute = require('./routes/users')
const LoginRoute = require('./routes/login')
const ScreenRoute = require('./routes/screens')
const ContainerRoute = require('./routes/screen_containers')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', LoginRoute)
app.use('/', UserRoute)
app.use('/', ScreenRoute)
app.use('/', ContainerRoute)

mongoose.connect(process.env.MONGODB_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, "Error during db connection"))
db.once('open', () => {
    console.log('Database successfully connected')
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))

