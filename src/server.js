
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);


/*
const express = require("express");
const app = express();

//teste

app.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
app.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));

*/

