const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('client'));
app.use('client/js', express.static(__dirname + 'client/js'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(80, function () {
//app.listen(3000, function () {
  console.log('Example app listening on port 80!')
});
