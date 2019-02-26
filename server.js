require('dotenv').config();
var express = require('express'),
bodyParser = require('body-parser');
app = express(),
port = process.env.PORT || 3001;
app.listen(port);
console.log(process.env.APP_NAME + ' started on port ' + port +' (yay!)');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./routes/appRoutes.js'); //importing route
routes(app); //register the route