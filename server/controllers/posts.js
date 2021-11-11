const express = require("express");
const model = require("../models/posts");

const app = express.Router();

app
    .get("/", (req, res, next) => {
        res.send(model.getAll());
    })
    .get("/search", (req, res, next) => {
        res.send(model.search(req.query.q));
    })
    .get("/:id", (req, res, next) => {
        console.log(req.headers);

        res.send(model.get(req.params.id));
    })
    .post("/", (req, res, next) => {
        const newPost = model.add(req.body)

        res.status(201).send(newPost);
    })

module.exports = app;