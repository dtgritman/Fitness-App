import { api } from "./serverApi";

export function get(userHandle) {
    return api("activities/" + userHandle, {}, 'POST');
}

export function add(userHandle, activity) {
    return api("activities/add/" + userHandle, activity, 'POST');
}

export function update(activity) {
    return api("activities/update/" + activity._id, activity, 'POST');
}