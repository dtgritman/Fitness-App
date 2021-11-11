const express = require('express');
const model = require('../models/users')

const app = express.Router();

app
    .get('/', (req, res, next) => {
        res.send("test");
    })
    .get("/:userid", (req, res, next) => {
        res.send(model.get(req.params.userid))
    })
    .post("/login", (req, res, next) => {
        model.login(req.body.handle, req.body.password, (err, user) => {
            if (err) {
                next(err);
            }
            res.send(user)
        })
    })
    .post("/signup", (req, res, next) => {
        const user = req.body;

        model.add(user, (err, user) => {
            if (err) {
                next(err);
            }
            res.send(user)
        })
    })
    ;

module.exports = app;
