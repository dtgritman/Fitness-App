const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('users');

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
        { $unwind: "$user" },
        { $project: { "user._id": 1, "user.firstName": 1, "user.lastName": 1, "user.handle": 1 } }
    ]).toArray();
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
    collection, get, follow, unFollow, approve,
}