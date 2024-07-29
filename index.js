require('dotenv').config();

const express = require('express');
const appRoutes = require('./routes/public');
const admRouter = require('./routes/admin');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');

const app = express();

const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
        secret: 'keyboard warrior',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONN
        }),
    }
));


app.use(expressLayout);
app.use(express.json());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

app.use('/', appRoutes.routes);
app.use('/',admRouter.admin);

app.listen(PORT,() => {
 console.log(`Server is running on port ${PORT}`)
});