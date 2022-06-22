const express = require('express');
const app = express();

const routerRegister = require('./routes/register');


app.use('/register', routerRegister);



module.exports = app;

