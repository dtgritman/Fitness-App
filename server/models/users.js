const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('users');
module.exports.collection = collection;

module.exports.getAll = function () { return collection.find().toArray(); }
module.exports.get = userId => collection.findOne({ _id: new ObjectId(userId) });
module.exports.getByHandle = async function (handle) {
    const user = await collection.findOne({ handle: handle });
    if (!user) {
        return Promise.reject({ code: 401, msg: "Sorry there is no user with that handle" });
    }

    return { ...user, password: undefined };
}

module.exports.add = async function (user) {
    if (!user.firstName || !user.lastName) {
        return Promise.reject({ code: 422, msg: "Full name is required" })
    }
    if (!user.handle) {
        return Promise.reject({ code: 422, msg: "User handle is required" })
    }
    if (!user.password) {
        return Promise.reject({ code: 422, msg: "Password is required" })
    }

    if (user.handle.charAt(0) != '@') {
        user.handle = '@' + user.handle;
    }

    const hash = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS)
    user.password = hash;

    const newUser = await collection.insertOne(user);
    newUser._id = newUser.insertedId;

    return { ...user, password: undefined };
}

module.exports.update = async function (userId, user) {
    const results = await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: user },
        { returnDocument: 'after' }
    );

    return { ...results.value, password: undefined };
}

module.exports.remove = async function (userId) {
    const results = await collection.findOneAndDelete({ _id: new ObjectId(userId) })

    return results.value;
}

module.exports.login = async function (handle, password) {
    const user = await collection.findOne({ handle });
    if (!user) {
        return Promise.reject({ code: 401, msg: "Sorry there is no user with that handle" });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
        return Promise.reject({ code: 401, msg: "Incorrect password" });
    }

    return { ...user, password: undefined };
}

module.exports.seed = async () => {
    for (const x of list) {
        await module.exports.add(x);
    }
}

const list = [
    {
        firstName: 'Moshe',
        lastName: 'Plotkin',
        handle: '@JewPaltz',
        pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMo3I5GL9_Zd_LULXRIXTzRLlVESBnoGp8sw&usqp=CAU',
        password: 'me',
        sex: 'Male',
        birthday: '01-25-1977',
        height: 69,
        weight: 171,
        isAdmin: true,
        emails: [
            "plotkinm@newpaltz.edu"
        ],
        following: [{ handle: '@vp', isApproved: true }, { handle: '@johnsmith', isApproved: true },],
    },
    {
        firstName: 'Kamala',
        lastName: 'Harris',
        handle: '@vp',
        pic: 'data:image/jpeg;base64,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',
        password: 'Her',
        sex: 'Female',
        birthday: '10-24-1964',
        height: 61,
        weight: 130,
        isAdmin: true,
        emails: [
            "vp@wh.com"
        ],
        following: [{ handle: '@johnsmith', isApproved: true },],
    },
    {
        firstName: 'John',
        lastName: 'Smith',
        handle: '@johnsmith',
        pic: 'data:image/jpeg;base64,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',
        password: 'BeepBop',
        sex: 'Male',
        birthday: '01-01-1971',
        height: 73,
        weight: 197,
        isAdmin: false,
        emails: [
            "john@smith.com"
        ],
        following: [{ handle: '@vp', isApproved: true },],
    },
];