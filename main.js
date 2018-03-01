const express = require('express')
const app = express()
var path = require('path');

app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(1337, () => console.log('T H O T 1337er5 listening on port 1337!'))