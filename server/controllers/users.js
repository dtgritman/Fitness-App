const express = require('express');
const model = require('../models/users')

const app = express.Router();

app
    .get('/', (req, res, next) => {
        res.send("test");
    });

module.exports = app;
