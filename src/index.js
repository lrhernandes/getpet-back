const express = require('express');
const bodyParser = require('body-parser');
const routes = require ('./routes');
const cors = require ('cors');
const app = express();

const session = require('express-session');

const sequelize = require('./database/connection');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes);

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


app.listen(3333);  