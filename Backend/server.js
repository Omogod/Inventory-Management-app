const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//connect to DB and listen to server

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }).catch(err => console.log(err));

