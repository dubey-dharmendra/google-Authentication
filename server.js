require("dotenv").config()
const express = require("express");
const userRoute = require('./routes/userRouter')
const logger = require('./utils/logger')
const port = process.env.PORT || 3000;
const cookieParse = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParse())

app.set('view engine', 'ejs')

app.use("/auth", userRoute);

app.get('/', (req, res) => {
 console.log(req.url);
 res.render('home')
 logger.log('info', 'Home page')
})

app.use('*', (req, res) => {
 logger.log('error', 'Invalid route')
})

app.listen(port, () => logger.log('info', `App in running on "http://localhost:${port}..."`));
