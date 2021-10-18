/* B"H
*/
import { getByHandle } from "./users";

const list = [
    {
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "Lorem Ipsom",
        time: Date(),
        userHandle: "@johnsmith",
        isPublic: true,
        likes: 20,
    },
    {
        src: "https://bulma.io/images/placeholders/1280x960.png",
        alt: "Placeholder image",
        caption: "We want Moshiach Now",
        time: Date(),
        userHandle: "@vp",
        isPublic: true,
        likes: 23,
    },
    {
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t31.18172-8/p720x720/886090_10100137903372610_773365632_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=DWVdkKM2PwQAX_tAc5p&_nc_ht=scontent-lga3-2.xx&oh=d9d284fef84a57b1a824932d5fd2da20&oe=618A0203",
        alt: "Purim in SUB #100",
        caption: "What a purim to remember",
        time: Date(),
        userHandle: "@JewPaltz",
        isPublic: true,
        likes: 12,
    },
    {
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/s600x600/244029201_10167312248050347_4050463819121596219_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=oaf-csovSFEAX-I2hxQ&_nc_ht=scontent-lga3-2.xx&oh=8466fcd68032477fab99306ba1a6e800&oe=61895C64",
        alt: "Mug with slogan",
        caption: "Never be afraid to try something new. The ark was built by amateurs and the Titanic by professionals",
        //time: (new Date() - (1*60*60*24)).toLocaleString(),
        time: Date(),
        userHandle: "@JewPaltz",
        isPublic: true,
        likes: 11,
    },
    {
        src: "https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/p180x540/242759506_10102663165018030_5506732176336636339_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=LJFWaOTJXvUAX-skiU3&_nc_ht=scontent-lga3-2.xx&oh=e6a03799ccf969c3b3fe62a7b266b8b9&oe=618C38F8",
        alt: "The family",
        caption: "The whole family. All the kids hiking together. Sukkot Vacation.",
        time: Date(),
        userHandle: "@JewPaltz",
        isPublic: true,
        likes: 19,
    },
];

const listWithOwner = () => list.map(x => ({
    ...x,
    user: getByHandle(x.userHandle)
}));

export function getAll() {
    return listWithOwner();
}

export function getWall(handle) {
    return listWithOwner().filter(post => post.userHandle == handle);
}

export function getFeed(handle) {
    return listWithOwner()
        .filter(post => getByHandle(handle).following.some(f => f.handle == post.userHandle && f.isApproved));
}


export function get(post_id) { return list[post_id]; }
export function add(post) {
    if (!post.userHandle) {
        throw { code: 422, msg: "Post must have an Owner" }
    }
    list.push(post);
    return { ...post };
}
export function update(post_id, post) {
    const oldObj = list[post_id];
    const newObj = { ...oldObj, ...post }
    list[post_id] = newObj;
    return newObj;
}
export function remove(post_id) {
    const post = list[post_id];
    list.splice(post_id, 1);
    return post;
}
