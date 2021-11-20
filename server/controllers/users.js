const express = require("express");
const model = require("../models/users");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(user => res.send(user))
            .catch(next)
    })
    .get("/:userId", (req, res, next) => {
        model.get(req.params.userId)
            .then(user => res.send(user))
            .catch(next)
    })
    .patch("/:userId", (req, res, next) => {
        model.update(req.params.userId, req.body)
            .then(user => res.send(user))
            .catch(next)
    })
    .patch("/profile/:userId", (req, res, next) => {
        model.updateProfile(req.params.userId, req.body)
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
    .post("/reset", (req, res, next) => {
        model.reset()
            .then(x => res.status(201).send("Users have been reset to default"))
            .catch(next)
    })

module.exports = app;