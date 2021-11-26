import { api } from "./serverApi";

export function getByHandle(handle) {
    return api("users/" + handle);
}

export function add(user) {
    return api("users/register/", user);
}

export function update(userId, user) {
    return api("users/" + userId, user, "PATCH");
}

export function updatePic(userId, pic) {
    return api("users/pic/" + userId, pic, "PATCH");
}

export function updateProfile(userId, profile) {
    return api("users/profile/" + userId, profile, "PATCH");
}

export function login(handle, password) {
    return api('users/login', { "handle": handle, "password": password });
}
