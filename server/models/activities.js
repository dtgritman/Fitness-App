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
    { $project: { "user.password": 0 } }
];

const getAll = () => collection.aggregate(addOwnerPipeline).toArray();
const get = (activityId) => collection.findOne({ _id: new ObjectId(activityId) });
const getByHandle = (handle) => collection.find({ handle: handle }).sort({ date: -1 }).toArray();

async function add(activity) {
    if (!activity.handle) {
        throw { code: 422, msg: "Activity must have an owner" }
    }

    const response = await collection.insertOne(activity);
    if (!response.insertedId) {
        throw { code: 422, msg: "Error adding activity" }
    }
    activity._id = response.insertedId;

    return { ...activity };
}

async function update(activityId, activity) {
    let results = undefined;
    if (activity.activities.length < 1) {
        results = await remove(activityId);
        if (results) {
            results = activity;
        }
        delete results._id;
        return results;
    }
    else {
        results = await collection.findOneAndUpdate(
            { _id: new ObjectId(activityId) },
            { $set: { activities: activity.activities } },
            { returnDocument: 'after' }
        );
        return results.value;
    }
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
        date: (new Date()).toISOString(),
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
        date: (new Date("11-15-2021")).toISOString(),
        activities: [
            {
                name: "walking",
                info: "2 miles",
                time: 50
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
        date: (new Date("11-14-2021")).toISOString(),
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