const express = require("express");
const model = require("../models/activities");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(x => res.send(x))
            .catch(next)
    })
    .get("/:handle", (req, res, next) => {
        model.getByHandle(req.params.handle)
            .then(activities => res.send(activities))
            .catch(next)
    })
    .post("/add", (req, res, next) => {
        model.add(req.body)
            .then(activities => res.send(activities))
            .catch(next)
    })
    .patch("/update/:activityId", (req, res, next) => {
        model.update(req.params.activityId, req.body)
            .then(activities => res.send(activities))
            .catch(next)
    })
    .post("/reset", (req, res, next) => {
        model.reset()
            .then(x => res.status(201).send("Activities have been reset to default"))
            .catch(next)
    })

module.exports = app;