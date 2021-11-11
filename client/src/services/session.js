import router from "../router";
import { login } from "../services/users";
import { NotificationProgrammatic } from "@oruga-ui/oruga-next/dist/esm/notification";

const session = {
    user: null,
    notifications: [],
    toRoute: '/home',
    
    login(username, password) {
        try {
            const response = login(username, password);
            this.user = response.user;

            // go to page initially requested
            router.push(this.toRoute);
        } catch (error) {
            NotificationProgrammatic.open({
                duration: 5000,
                message: error.msg,
                variant: 'danger',
                type: 'danger',
                closable: true,
            });
        }
    },
    logout() {
        this.user = null;
        this.notifications = [];
    }
};

export default session;
