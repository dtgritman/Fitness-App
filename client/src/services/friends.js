import { api } from "./serverApi";

export function get(handle) {
    return api("users/friends/" + handle);
}

export function add(userHandle, followUserHandle) {
    return api("users/friends/add/" + userHandle, followUserHandle, 'POST');
}