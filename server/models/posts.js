const users = require('./users');
const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('posts');

const addOwnerPipeline = [
    {
        $lookup: {
            from: "users",
            localField: 'handle',
            foreignField: 'handle',
            as: 'user',
        }
    },
    { $unwind: "$user" },
    { $project: { "user.password": 0, "user.email": 0, "user.profile": 0 } }
];

const getAll = () => collection.find().toArray();

const getWall = (handle) => collection.find({ handle: handle }).toArray();

function getFeed(handle) {
    const query = users.collection.aggregate([
        { $match: { handle: handle } },
        {
            "$lookup": {
                from: "posts",
                localField: "following.handle",
                foreignField: "handle",
                as: "posts"
            }
        },
        { $unwind: '$posts' },
        { $replaceRoot: { newRoot: "$posts" } },
    ]);

    return query.toArray();
}

const get = (postId) => collection.findOne({ _id: new ObjectId(postId) });

async function add(post, time = new Date()) {
    if (!post.handle) {
        throw { code: 422, msg: "Post must have an Owner" }
    }
    post.time = time;
    post._id = (await collection.insertOne(post)).insertedId;

    return { ...post };
}

async function update(postId, post) {
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $set: post },
        { returnDocument: 'after' }
    );

    return result.value;
}

async function addLike(postId, userId) {
    const user = await users.get(userId);
    if (!user)
        throw ({ code: "418", msg: "I'm a little tea pot, Short and stout. Here is an error, Here is my spout. When I get all steamed up, Hear me shout: Tip me over, And pour me out!" });

    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $addToSet: { liked: user.handle } },
        { projection: { liked: 1 }, returnDocument: 'after' }
    );

    return result.value;
}

async function removeLike(postId, userId) {
    const user = await users.get(userId);
    if (!user)
        throw ({ code: "418", msg: "You can't brew coffee without a teapot... Wait I make coffee with a Keurig so I don't have a teapot but maybe try again later." });
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $pull: { liked: user.handle } },
        { projection: { liked: 1 }, returnDocument: 'after' }
    );

    return result.value;
}

async function remove(postId) {
    const result = await collection.findOneAndDelete({ _id: new ObjectId(postId) });

    return result.value;
}

const search = (query) => collection.find({ caption: new RegExp(query, "i") }).toArray();

const seed = async () => {
    for (const post of postList) {
        await add(post, post.time);
    }
}

const reset = () => collection.drop().catch().finally(seed);

module.exports = {
    collection, getAll, getWall, getFeed, get, add, update, addLike, removeLike, remove, search, seed, reset,
}

const postList = [
    {
        handle: "@johnsmith",
        activities: [],
        caption: "",
        time: new Date("11-11-2021"),
        liked: [],
    },
    {
        handle: "@vp",
        activities: [],
        caption: "",
        time: new Date("11-11-2021"),
        liked: [ "@JewPaltz", "@johnsmith" ],
    },
    {
        handle: "@vp",
        activities: [],
        caption: "",
        time: new Date("11-11-2021"),
        liked: [],
    },
    {
        handle: "@JewPaltz",
        activities: [],
        caption: "",
        time: new Date("11-10-2021"),
        liked: [ "@johnsmith" ],
    },
    {
        handle: "@JewPaltz",
        activities: [],
        caption: "",
        time: new Date("11-04-2021"),
        liked: [],
    },
    {
        handle: "@JewPaltz",
        activities: [],
        caption: "",
        time: new Date("11-01-2021"),
        liked: [ "@vp" ]
    },
];