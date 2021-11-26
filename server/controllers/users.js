const express = require("express");
const model = require("../models/users");
const friends = require("../models/friends");

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
    .patch("/pic/:userId", (req, res, next) => {
        model.updateProfile(req.params.userId, req.body)
            .then(pic => res.send(pic))
            .catch(next)
    })
    .patch("/profile/:userId", (req, res, next) => {
        model.updateProfile(req.params.userId, req.body)
            .then(profile => res.send(profile))
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
    .post("/friends/:handle", (req, res, next) => {
        friends.get(req.params.handle)
            .then(friends => res.send(friends))
            .catch(next)
    })
    .post("/friends/add/:follower/:followee", (req, res, next) => {
        friends.follow(req.params.follower, req.params.followee)
            .then(response => {
                if (response.modifiedCount) {
                    res.send({ success: true });
                } else {
                    throw { code: 409, msg: "You are already following or trying to follow " + req.params.followee }
                }
            })
            .catch(next)
    })
    .delete("/friends/remove/:follower/:followee", (req, res, next) => {
        friends.unFollow(req.params.follower, req.params.followee)
            .then(response => {
                if (response.modifiedCount) {
                    res.send({ success: true });
                } else {
                    throw { code: 404, msg: "You aren't following or trying to follow " + req.params.followee }
                }
            })
            .catch(next)
    })
    .patch("/friends/approve/:follower/:followee", (req, res, next) => {
        friends.approve(req.params.follower, req.params.followee, req.body.shouldApprove)
            .then(response => {
                if (response.modifiedCount) {
                    res.send({ success: true });
                } else {
                    throw { code: 409, msg: req.params.follower + " hasn't request to follow you." }
                }
            })
            .catch(next)
    })
    .get("/friends/find/:q", (req, res, next) => {
        friends.search(req.params.q)
            .then(results => res.send(results))
            .catch(next)
    })
    .post("/reset", (req, res, next) => {
        model.reset()
            .then(x => res.status(201).send("Users have been reset to default"))
            .catch(next)
    })

module.exports = app;