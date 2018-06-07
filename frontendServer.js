const express = require('express')
const app = express()
var path = require("path");
app.use(express.static('views'));

app.listen(3000, '0.0.0.0', function () {
    console.log('app listening on port 3000!')
  })