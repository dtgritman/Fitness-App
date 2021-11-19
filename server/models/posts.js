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

const getAll = () => collection.aggregate(addOwnerPipeline).toArray();

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
    const results = await collection.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $set: post },
        { returnDocument: 'after' }
    );

    return results.value;
}

async function updateLike(postId, user) {
    //update
}

async function remove(postId) {
    const results = await collection.findOneAndDelete({ _id: new ObjectId(postId) });

    return results.value;
}

const search = (query) => collection.find({ caption: new RegExp(query, "i") }).toArray();

const seed = async () => {
    for (const post of postList) {
        await add(post, post.time);
    }
}

const reset = () => collection.drop().catch().finally(seed);

module.exports = {
    collection, getAll, getWall, getFeed, get, add, update, remove, search, seed, reset,
}

const postList = [
    {
        handle: "@johnsmith",
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "Lorem Ipsom",
        time: new Date("11-11-2021"),
        isPublic: true,
        liked: [],
    },
    {
        handle: "@vp",
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "We want Moshiach Now",
        time: new Date("11-11-2021"),
        isPublic: true,
        liked: ["@JewPaltz", "@Potus"],
    },
    {
        handle: "@JewPaltz",
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t31.18172-8/p720x720/886090_10100137903372610_773365632_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=DWVdkKM2PwQAX_tAc5p&_nc_ht=scontent-lga3-2.xx&oh=d9d284fef84a57b1a824932d5fd2da20&oe=618A0203",
        alt: "Purim in SUB #100",
        caption: "What a purim to remember",
        time: new Date("11-10-2021"),
        isPublic: true,
        liked: ["@johnsmith"],
    },
    {
        handle: "@JewPaltz",
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/s600x600/244029201_10167312248050347_4050463819121596219_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=oaf-csovSFEAX-I2hxQ&_nc_ht=scontent-lga3-2.xx&oh=8466fcd68032477fab99306ba1a6e800&oe=61895C64",
        alt: "Mug with slogan",
        caption: "Never be afraid to try something new. The ark was built by amateurs and the Titanic by professionals",
        time: new Date("11-04-2021"),
        isPublic: true,
        liked: [],
    },
    {
        handle: "@JewPaltz",
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/p180x540/242759506_10102663165018030_5506732176336636339_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=LJFWaOTJXvUAX-skiU3&_nc_ht=scontent-lga3-2.xx&oh=e6a03799ccf969c3b3fe62a7b266b8b9&oe=618C38F8",
        alt: "The family",
        caption: "The whole family. All the kids hiking together. Sukkot Vacation.",
        time: new Date("11-01-2021"),
        isPublic: true,
        liked: ["@vp", "@johnsmith"]
    },
];