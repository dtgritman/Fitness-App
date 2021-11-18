const users = require('./users');
const { ObjectId } = require('bson');
const { client } = require('./mongo');

const collection = client.db(process.env.MONGO_DB).collection('posts');
module.exports.collection = collection;


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

module.exports.getAll = function () {
    return collection.aggregate(addOwnerPipeline).toArray();
}

module.exports.getWall = function (handle) {
    return collection.aggregate(addOwnerPipeline).match({ handle: handle }).toArray();
}

module.exports.getFeed = function (handle) {
    const query = users.collection.aggregate([
        { $match: { handle } },
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
    ].concat(addOwnerPipeline));
    return query.toArray();
}


module.exports.get = function (post_id) {
    return collection.findOne({ _id: new ObjectId(post_id) });
}

module.exports.add = async function (post) {
    if (!post.handle) {
        throw { code: 422, msg: "Post must have an Owner" }
    }
    post.time = Date();

    const response = await collection.insertOne(post);

    post.id = response.insertedId;

    return { ...post };
}

module.exports.update = async function (postId, post) {
    const results = await collection.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $set: post },
        { returnDocument: 'after' }
    );

    return results.value;
}

module.exports.remove = async function (postId) {
    const results = await collection.findOneAndDelete({ _id: new ObjectId(postId) })

    return results.value;
}

module.exports.search = q => collection.find({ caption: new RegExp(q, "i") }).toArray();

module.exports.reset = async () => {
    const dropped = collection.drop()
        .then(async () => {
            for (const x of list) {
                await this.add(x)
            }
        })
        .catch(err => {
             throw { code: 422, msg: "Issue dropping table - " + err.msg }
        })
}

const list = [
    {
        handle: "@johnsmith",
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "Lorem Ipsom",
        time: Date(),
        isPublic: true,
        liked: [],
    },
    {
        handle: "@vp",
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "We want Moshiach Now",
        time: Date(),
        isPublic: true,
        liked: ["@JewPaltz", "@Potus"],
    },
    {
        handle: "@JewPaltz",
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t31.18172-8/p720x720/886090_10100137903372610_773365632_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=DWVdkKM2PwQAX_tAc5p&_nc_ht=scontent-lga3-2.xx&oh=d9d284fef84a57b1a824932d5fd2da20&oe=618A0203",
        alt: "Purim in SUB #100",
        caption: "What a purim to remember",
        time: Date(),
        isPublic: true,
        liked: ["@johnsmith"],
    },
    {
        handle: "@JewPaltz",
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/s600x600/244029201_10167312248050347_4050463819121596219_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=oaf-csovSFEAX-I2hxQ&_nc_ht=scontent-lga3-2.xx&oh=8466fcd68032477fab99306ba1a6e800&oe=61895C64",
        alt: "Mug with slogan",
        caption: "Never be afraid to try something new. The ark was built by amateurs and the Titanic by professionals",
        time: Date(),
        isPublic: true,
        liked: [],
    },
    {
        handle: "@JewPaltz",
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/p180x540/242759506_10102663165018030_5506732176336636339_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=LJFWaOTJXvUAX-skiU3&_nc_ht=scontent-lga3-2.xx&oh=e6a03799ccf969c3b3fe62a7b266b8b9&oe=618C38F8",
        alt: "The family",
        caption: "The whole family. All the kids hiking together. Sukkot Vacation.",
        time: Date(),
        isPublic: true,
        liked: ["@vp", "@johnsmith"]
    },
];