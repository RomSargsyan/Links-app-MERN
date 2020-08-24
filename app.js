const cors = require("cors");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json({ extended: true }))

const auth = require("./routes/auth");
const link = require("./routes/link");
const redirect = require("./routes/redirect");

app.use(cors())
app.use('/t', redirect)
app.use('/api/auth', auth)
app.use('/api/link', link)
app.use(bodyParser.json())

const PORT = config.get('port') || 5000;
const mongoURI = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (error) {
        if (error) {
            console.log("Server Errore", error.message)
            process.exit(1)
        }
    }
}

start()

// const express = require('express')
// const config = require('config')
// const path = require('path')
// const mongoose = require('mongoose')

// const app = express()

// app.use(express.json({ extended: true }))

// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/link', require('./routes/link'))
// app.use('/t', require('./routes/redirect'))


// const PORT = config.get('port') || 5000

// async function start() {
//   try {
//     await mongoose.connect(config.get('mongoUri'), {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true
//     })
//     app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
//   } catch (e) {
//     console.log('Server Error', e.message)
//     process.exit(1)
//   }
// }

// start()


