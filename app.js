const cors = require("cors");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const link = require("./routes/link");
const redirect = require("./routes/redirect");

const app = express();

app.use(cors())
app.use('/t', redirect)
app.use('/api/auth', auth)
app.use('/api/link', link)
app.use(bodyParser.json())
app.use(express.json({ extended: true }))

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
        }
    }
}

start()
