const express = require('express');
const appRoutes = require('./routes/public')
const admRouter = require('./routes/admin')
require('dotenv').config();

const app = express();

const PORT = 5005 || process.env.PORT;

app.use(express.static('public'))

const expressLayout = require('express-ejs-layouts');

app.use(expressLayout);
app.use(express.json());

app.set('view engine', 'ejs');
app.set('layout', './layouts/main')

app.use('/', appRoutes.routes)
app.use('/admin',admRouter.admin)

app.listen(PORT,() => {
 console.log(`Server is running on port ${PORT}`)
})