const express = require("express");
const model = require("../models/users");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(user => {
                res.send(user);
            })
            .catch(next)
    })
    .get("/:user_id", (req, res, next) => {
        model.get(req.params.user_id)
            .then(user => {
                res.send(user);
            })
            .catch(next)
    })
    .patch("/:user_id", (req, res, next) => {

        model.update(req.params.user_id, req.body)
            .then(user => res.send(user))
            .catch(next)

    })
    .post("/login", (req, res, next) => {

        model.login(req.body.handle, req.body.password)
            .then(user => {
                res.send(user);
            })
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