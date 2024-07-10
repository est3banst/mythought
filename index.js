const express = require('express');
const appRoutes = require('./routes/public')
const admRouter = require('./routes/admin')
require('dotenv').config();
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoStore = require('connect-mongo')

const app = express();

const PORT = 5005 || process.env.PORT;

connectDB();

app.use(express.static('public'))

const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser)
app.use(session)
app.use(expressLayout);
app.use(express.json());

app.set('view engine', 'ejs');
app.set('layout', './layouts/main')

app.use('/', appRoutes.routes)
app.use('/admin',admRouter.admin)

app.listen(PORT,() => {
 console.log(`Server is running on port ${PORT}`)
})