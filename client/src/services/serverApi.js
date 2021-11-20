import session from "./session";



export async function api(url, data = null, method = null) {
    const API_ROOT = process.env.VUE_APP_API_ROOT ?? "http://localhost:3100/";
    console.log(API_ROOT)
    try {
        let response;
        if (data) {
            response = await fetch(API_ROOT + url, {
                method: method ?? "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }
        else {
            response = await fetch(API_ROOT + url);
        }

        if (!response.ok) {
            throw await response.json();
        }
        return await response.json();
    } catch (err) {
        session.error(err);
    }
}
