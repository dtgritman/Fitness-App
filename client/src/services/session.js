import router from "../router";
import { login } from "../services/users";
import { NotificationProgrammatic } from "@oruga-ui/oruga-next/dist/esm/notification";

const session = {
    user: null,
    notifications: [],
    toRoute: '/',

    async login(username, password) {
        const response = await login(username, password);
        if (response) {
            this.user = response;

            // go to page initially requested
            router.push(this.toRoute);
        }
    },
    logout() {
        this.user = null;
        this.notifications = [];
        this.toRoute = '/';
    },
    notify(msg) {
        NotificationProgrammatic.open({
            duration: 3000,
            message: msg,
            variant: 'success',
            type: 'success',
        })
    },
    error(error) {
        const msg = error.msg ?? error;
        NotificationProgrammatic.open({
            duration: 5000,
            message: msg,
            variant: 'danger',
            type: 'danger',
        })
    }
};

export default session;
