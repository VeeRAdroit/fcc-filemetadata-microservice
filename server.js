'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (req.file) {
    console.log('Uploaded File is  ', req.file);
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({ name, type, size });
  } else {
    res.status(500).json({ error: "file Upload Failed" });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
