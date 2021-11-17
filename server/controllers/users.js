const express = require("express");
const model = require("../models/users");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(user => res.send(user))
            .catch(next)
    })
    .get("/:handle", (req, res, next) => {
        model.getByHandle("@" + req.params.handle)
            .then(user => res.send(user))
            .catch(next)
    })
    .patch("/:userId", (req, res, next) => {
        model.update(req.params.userId, req.body)
            .then(user => res.send(user))
            .catch(next)
    })
    .post("/login", (req, res, next) => {
        model.login(req.body.handle, req.body.password)
            .then(user => res.send(user))
            .catch(next)
    })
    .post("/register", (req, res, next) => {
        model.add(req.body)
            .then(user => {
                res.status(201).send(user);
            })
            .catch(next)
    })

module.exports = app;