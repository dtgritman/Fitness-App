const express = require("express");
const model = require("../models/posts");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        model.getAll()
            .then(posts => res.send(posts))
            .catch(next)
    })
    .get("/:id", (req, res, next) => {
        model.get(req.params.id)
            .then(posts => res.send(posts))
            .catch(next)
    })
    .get("/wall/:handle", (req, res, next) => {
        model.getWall(req.params.handle)
            .then(posts => res.send(posts))
            .catch(next)
    })
    .get("/feed/:handle", (req, res, next) => {
        model.getFeed(req.params.handle)
            .then(posts => res.send(posts))
            .catch(next)
    })
    .post("/", (req, res, next) => {
        model.add(req.body)
            .then(post => res.send(post))
            .catch(next)
    })
    .patch("/:id", (req, res, next) => {
        model.update(req.params.id, req.body)
            .then(post => res.send(post))
            .catch(next)
    })
    .patch("/:postId/like/:userId", (req, res, next) => {
        model.addLike(req.params.postId, req.params.userId)
            .then(liked => res.send(liked))
            .catch(next)
    })
    .delete("/:postId/like/:userId", (req, res, next) => {
        model.removeLike(req.params.postId, req.params.userId)
            .then(liked => res.send(liked))
            .catch(next)
    })
    .delete("/:id", (req, res, next) => {
        model.remove(req.params.id)
            .then(result => result.send({ deleted: x }))
            .catch(next)
    })
    .post("/reset", (req, res, next) => {
        model.reset()
            .then(result => result.status(201).send("Posts have been reset to default"))
            .catch(next)
    })

module.exports = app;