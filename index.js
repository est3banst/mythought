const express = require('express');
const appRoutes = require('./routes/public')
require('dotenv').config();

const app = express();

const PORT = 5005 || process.env.PORT;

app.use(express.static('public'))

const expressLayout = require('express-ejs-layouts');

app.use(expressLayout);

app.set('view engine', 'ejs');
app.set('layout', './layouts/main')

app.use('/', appRoutes.routes)

app.listen(PORT,() => {
 console.log(`Server is running on port ${PORT}`)
})