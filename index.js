const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public/html'))
app.use(express.static('public/css'))
app.use(express.static('public/js'))
app.use(express.static('public/images'))
app.use(express.static('public'))

app.listen(3000);