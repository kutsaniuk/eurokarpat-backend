module.exports = (app, cors, corsOptions) => {
    const auth = require("../controllers/auth.controller.js");

    let router = require("../utils/router").Router();
    router.all('*', cors(corsOptions));

    router.post("/register", auth.register);

    router.post("/login", auth.login);

    app.use("/auth", router);
};
