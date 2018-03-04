var routes = function(app, upload, fs) {

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

      // remove uploaded file after retrieving file name and size
      fs.unlink(doc.path, function(err) {
        if (err) throw err;
        console.log(doc.path + "was deleted");
      });
      res.send(file);

    };
  });
};

module.exports = routes;
