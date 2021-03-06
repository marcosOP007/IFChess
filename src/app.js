const express = require('express');
const app = express();

const routerRegister = require('./routes/register');
const routerLogin    = require('./routes/login');
const routerSettings = require('./routes/settings');

app.use('/register', routerRegister);
app.use('/login', routerLogin);
app.use('/settings', routerSettings);


app.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
app.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));




module.exports = app;

