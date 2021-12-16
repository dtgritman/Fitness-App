const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db().collection('users');
const friendProjection = { "_id": 1, "handle": 1, "firstName": 1, "lastName": 1, "pic": 1 };

async function get(handle) {
    return await collection.aggregate([
        { $match: { "handle": handle } },
        {
            "$lookup": {
                from: "users",
                localField: 'following.handle',
                foreignField: 'handle',
                as: 'user',
            }
        },
        { $unwind:"$user" },
        { $replaceRoot: { newRoot: "$user" } },
        { $project: friendProjection }
    ]).toArray();
}

async function searchFriends(handle, q) {
    return await collection.aggregate([
        { $match: { "handle": handle } },
        {
            "$lookup": {
                from: "users",
                localField: 'following.handle',
                foreignField: 'handle',
                as: 'user',
            }
        },
        { $unwind: "$user" },
        { $replaceRoot: { newRoot: "$user" } },
        {
            $match: { handle: new RegExp(q, 'i') }
        },
        { $project: friendProjection }
    ]).toArray();
}

async function search(q) {
    return collection.find(
        { handle: new RegExp(q, 'i') },
        { projection: friendProjection }
    ).toArray();
}

async function follow(follower, followee) {
    return await collection.updateOne(
        { handle: follower, "following.handle": { $ne: followee } },
        { $addToSet: { following: { handle: followee, isApproved: false } } }
    );
}

async function unFollow(follower, followee) {
    return await collection.updateOne(
        { handle: follower },
        { $pull: { following: { handle: followee } } }
    );
}

async function approve(follower, followee, shouldApprove) {
    return await collection.updateOne(
        { handle: follower, "following.handle": followee },
        { $set: { "following.$.isApproved": shouldApprove } }
    );
}

module.exports = {
    collection, get, searchFriends, search, follow, unFollow, approve,
}