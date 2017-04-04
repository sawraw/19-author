'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));


// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));


app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'kennyiscool', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false, //don't resave if the session object hasn't changed
  saveUninitialized: false // do save session object even if we don't add anything to it
}));

module.exports = app;
