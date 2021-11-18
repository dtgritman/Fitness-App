const express = require("express");
const model = require("../models/posts");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(x => res.send(x))
            .catch(next)
    })
    .get("/:id", (req, res, next) => {
        model.get(req.params.id)
            .then(x => res.send(x))
            .catch(next)
    })
    .get("/wall/:handle", (req, res, next) => {
        model.getWall(req.params.handle)
            .then(x => res.send(x))
            .catch(next)
    })
    .get("/feed/:handle", (req, res, next) => {
        model.getFeed(req.params.handle)
            .then(x => res.send(x))
            .catch(next)
    })
    .post("/", (req, res, next) => {
        const newPost = model.add(req.body)

        res.status(201).send(newPost);
    })
    .post("/", (req, res, next) => {
        model.add(req.body)
            .then(x => res.status(201).send(x))
            .catch(next)
    })
    .patch("/:id", (req, res, next) => {
        model.update(req.params.id, req.body)
            .then(x => res.send(x))
            .catch(next)
    })
    .delete("/:id", (req, res, next) => {
        model.remove(req.params.id)
            .then(x => res.send({ deleted: x }))
            .catch(next)
    })
    .post("/reset", (req, res, next) => {
        model.reset()
            .then(x => res.status(201).send("Posts have been reset to default"))
            .catch(next)
    })

module.exports = app;