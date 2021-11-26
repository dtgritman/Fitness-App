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
    return api("posts", post, 'POST');
}

export function update(postId, post) {
    return api("posts/" + postId, post, 'PUT');
}

export function addLike(postId, userId) {
    return api("posts/" + postId + "/like/" + userId, {}, 'PATCH');
}

export function removeLike(postId, userId) {
    return api("posts/" + postId + "/like/" + userId, {}, 'DELETE');
}

export function remove(postId) {
    return api('posts/' + postId, {}, 'DELETE');
}
