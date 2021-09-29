const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const FileStore = require("session-file-store")(session);
const connect = require("./db");
const fs = require("fs");
dotenv.config();

const app = express();
//SET PORT
app.set("port", process.env.PORT || 3003);
//USE SESSION
app.use(
    session({
        secret: process.env.SESS_SEC,
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);
// json & body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//mongodb connect
connect();
//ROUTERS
const authRouter = require("./routes/auth");

app.use("/auth", authRouter);

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
