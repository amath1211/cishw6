var express = require('express');
var app = express();
var uuid = require('node-uuid');
var keyRouter = (require('./routes/keys'));
var apiRouter = (require('./routes/api'));
var checkValidKey = require('./middlewares/checkValidKey');

// Serve static pages
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/', keyRouter);

app.use('/api', checkValidKey, apiRouter);

// Generate a random cookie secret for this app
var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};
// TODO (Part 3) - Use the cookieSession middleware. The above function
// can be used to generate a secret key. Make sure that you're not accidentally
// passing the function itself - you need to call it to get a string.

// Mount your routers. Please use good style here: mount a single router per use() call,
// preceded only by necessary middleware functions.
// DO NOT mount an 'authenticating' middleware function in a separate call to use().
// For instance, the API routes require a valid key, so mount checkValidKey and apiRouter in the same call.

// Mount your error-handling middleware.
// Please mount each middleware function with a separate use() call.

module.exports = app;
