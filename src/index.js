const express = require('express');



const productController = require('./controllers/users.controllers')

const app = express();

app.use(express.json());

app.use('/users' , productController)

module.exports = app;