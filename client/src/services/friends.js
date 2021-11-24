import { api } from "./serverApi";

export function get(handle) {
    return api("users/friends/" + handle, {}, 'POST');
}

export function add(userHandle, followUserHandle) {
    return api("users/friends/add/" + userHandle + "/" + followUserHandle, {}, 'POST');
}

export function remove(userHandle, followUserHandle) {
    return api("users/friends/remove/" + userHandle + "/" + followUserHandle, {}, 'DELETE');
}