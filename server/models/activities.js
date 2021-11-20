const users = require('./users');
const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('activity');

const addOwnerPipeline = [
    {
        "$lookup": {
            from: "users",
            localField: 'handle',
            foreignField: 'handle',
            as: 'user',
        }
    },
    { $unwind: "$user" },
    { $project: { "owner.password": 0 } }
];

const getAll = () => collection.aggregate(addOwnerPipeline).toArray();
const get = (activityId) => collection.findOne({ _id: new ObjectId(activityId) });
const getByHandle = (handle) => collection.aggregate(addOwnerPipeline).match({ handle: handle }).toArray();

async function add(activity) {
    if (!activity.handle) {
        throw { code: 422, msg: "Activity must have an owner" }
    }

    const response = await collection.insertOne(activity);

    activity.id = response.insertedId;

    return { ...activity };
}

async function update(activityId, activity) {
    const results = await collection.findOneAndUpdate(
        { _id: new ObjectId(activityId) },
        { $set: activity },
        { returnDocument: 'after' }
    );

    return results.value;
}

async function remove(activityId) {
    const results = await collection.findOneAndDelete({ _id: new ObjectId(activityId) })

    return results.value;
}

const seed = async () => {
    for (const activity of activityList) {
        await add(activity);
    }
}

const reset = () => collection.drop().catch().finally(seed);

module.exports = {
    getAll, get, getByHandle, add, update, remove, seed, reset,
}

const activityList = [
    {
        handle: "@vp",
        date: new Date(),
        activities: [
            {
                name: "running",
                info: "1 mile",
                time: 20
            },
            {
                name: "walking",
                info: "0.5 miles",
                time: 30
            },
        ]
    },
    {
        handle: "@vp",
        date: new Date("11-15-2021"),
        activities: [
            {
                name: "walking",
                info: "2 miles",
                time: "50"
            },
            {
                name: "running",
                info: "0.5 miles",
                time: 4
            },
        ]
    },
    {
        handle: "@vp",
        date: new Date("11-14-2021"),
        activities: [
            {
                name: "walking",
                info: "3 miles",
                time: 100
            },
            {
                name: "dead lifts",
                info: "150 lbs",
                time: 15
            },
            {
                name: "jogging",
                info: "1.5 miles",
                time: 25
            },
        ]
    },
];