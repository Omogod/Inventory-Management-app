const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// routes middleware

app.use("/api/users", userRoute);

//routes 

app.get("/", (req, res) => {
    res.send("Hello World");
});


//error handler
app.use(errorHandler);

//connect to DB and listen to server

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }).catch(err => console.log(err));

