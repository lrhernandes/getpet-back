const express = require('express');
const bodyParser = require('body-parser');
const routes = require ('./routes');
const cors = require ('cors');
const app = express();
const dotenv = require('dotenv');

const session = require('express-session');

const sequelize = require('./database/connection');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes);

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


app.listen(process.env.PORT || 3333);  