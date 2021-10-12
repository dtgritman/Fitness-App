const session = {
    user: null,
    //user: {id: 1, email: "test@test.com", firstName: "Test", lastName: "User"},
    messages: [],
    Login(email, password) {
        this.user = {
            email,
            password,
            id: 613,
            firstName: "Dustin",
            lastName: "Gritman",
        }
    },
    Logout() {
        this.user = null;
    }
};

export default session
