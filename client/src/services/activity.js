import { api } from "./serverApi";

export function get(userHandle) {
    return api("activities/" + userHandle, null, 'GET');
}

export function add(activity) {
    return api("activities/add", activity, 'POST');
}

export function update(activity) {
    return api("activities/update/" + activity._id, activity, 'POST');
}