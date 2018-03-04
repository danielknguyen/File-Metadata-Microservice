var express = require('express'),
    app = express(),
    dotenv = require('dotenv').config(),
    bodyParser = require('body-parser'),
    engines = require('consolidate'),
    // express middleware for uploading files
    multer  = require('multer'),
    upload = multer({ dest: 'uploads/' });

// setup app configuration
var appConfig = function(app) {
  // serve static files, assets, css, javascript in public directory
  app.use(express.static(__dirname + '/public'));
  // set directory of views to display templates
  app.set('views', __dirname + '/views');
  // set engine template to nunjucks
  app.engine('html', engines.nunjucks);
  // convert data to be easily transferred through the web
  app.use(bodyParser.urlencoded({ extended: true}));
  // parse/analyze incoming data as json object
  app.use(bodyParser.json());
}(app);

// import routejs module
var routes = require('./public/scripts/routes.js')(app, upload);

// set up heroku env PORT || local
var port = process.env.PORT || 27017;
// listen for connection at port
var server = app.listen(port, function() {
  // log port number
  console.log("Express server is listening on port %s.", port);
});
