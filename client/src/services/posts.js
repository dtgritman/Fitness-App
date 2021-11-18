import { api } from "./serverApi";

export function getAll() {
    return api("posts");
}

export function getWall(handle) {
    return api("posts/wall/" + handle);
}

export function getFeed(handle) {
    return api("posts/feed/" + handle);
}

export function get(postId) {
    return api("posts/" + postId);
}

export function add(post) {
    return api("posts/" + post, post, 'POST');
}

export function update(postId, post) {
    return api("posts/" + postId, post, 'PUT');
}

export function remove(postId) {
    return api('posts/' + postId, {}, 'DELETE');
}
