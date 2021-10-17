import { login } from "../services/users";

const session = {
    user: null,
    messages: [],
    login(username, password) {
        let response = login(username, password);
        if (response)
            this.user = response.user;
    },
    logout() {
        this.user = null;
    }
};

export default session;
