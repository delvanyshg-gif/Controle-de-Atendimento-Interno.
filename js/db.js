const DB = {
    getUsers() {
        return JSON.parse(localStorage.getItem("atende_users")) || [];
    },

    saveUsers(users) {
        localStorage.setItem("atende_users", JSON.stringify(users));
    },

    createUser(user) {
        const users = this.getUsers();

        const exists = users.some(
            item => item.email.toLowerCase() === user.email.toLowerCase()
        );

        if (exists) {
            return {
                success: false,
                message: "Este e-mail já está cadastrado."
            };
        }

        users.push({
            id: Date.now(),
            name: user.name,
            email: user.email,
            password: user.password
        });

        this.saveUsers(users);

        return {
            success: true,
            message: "Conta criada com sucesso."
        };
    },

    login(email, password) {
        const users = this.getUsers();

        const user = users.find(
            item =>
                item.email.toLowerCase() === email.toLowerCase() &&
                item.password === password
        );

        if (!user) {
            return {
                success: false,
                message: "E-mail ou senha incorretos."
            };
        }

        localStorage.setItem(
            "atende_session",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            })
        );

        return {
            success: true,
            user
        };
    },

    getSession() {
        return JSON.parse(
            localStorage.getItem("atende_session")
        );
    },

    logout() {
        localStorage.removeItem("atende_session");
    },

    getRequests() {
        return JSON.parse(
            localStorage.getItem("atende_requests")
        ) || [];
    },

    saveRequests(requests) {
        localStorage.setItem(
            "atende_requests",
            JSON.stringify(requests)
        );
    },

    addRequest(request) {
        const requests = this.getRequests();

        const newRequest = {
            id: requests.length + 1,
            title: request.title,
            description: request.description,
            date: request.date,
            status: "Pendente",
            userEmail: this.getSession()?.email || ""
        };

        requests.push(newRequest);
        this.saveRequests(requests);

        return newRequest;
    }
};