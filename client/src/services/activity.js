import { api } from "./serverApi";

export function get(activtiesId) {
    return api("activity/" + activtiesId);
}

export function add(activity) {
    return api("activity/" + activity, activity, 'POST');
}