const express = require("express");
const model = require("../models/activities");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(x => res.send(x))
            .catch(next)
    })
    .post("/reset", (req, res, next) => {
        model.reset()
            .then(x => res.status(201).send("Activities have been reset to default"))
            .catch(next)
    })

module.exports = app;