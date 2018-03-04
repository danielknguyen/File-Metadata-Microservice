var routes = function(app, upload) {

  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.post('/get-file-size', upload.single('file'), function(req, res) {

    var file = {};

    var doc = req.file

    if (!doc) {
      res.send( { 'error': "No file chosen" } );
    } else {
      file.fileName = doc.originalname;
      file.size = doc.size;
      res.send(file);
    };
  });
};

module.exports = routes;
