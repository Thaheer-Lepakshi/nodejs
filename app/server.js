let express = require('express');
let path = require('path');
let fs = require('fs');
let rateLimit = require('express-rate-limit');
let app = express();

const profilePictureLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for profile pictures
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture-andrea', profilePictureLimiter, function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-andrea.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.get('/profile-picture-ari', profilePictureLimiter, function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-ari.jpeg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

