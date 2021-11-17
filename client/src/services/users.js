import { api } from "./serverApi";

export function getByHandle(handle) {
    return api("users/" + handle);
}

export function add(user) {
    return api("users/register/", user);
}

export function update(userId, user) {
    return api("users/" + userId, user, "PUT");
}

export function login(handle, password) {
    return api('users/login', { "handle": handle, "password": password });
}
