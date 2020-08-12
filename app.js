const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const auth = require('./routes/auth');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use(express.json({extended: true}))
app.use(cors())

const PORT = config.get('port') || 5000;
const mongoURI = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (error) {
        if (error) {
            console.log("Server Errore", error.message);
        }
    }
}

start();
