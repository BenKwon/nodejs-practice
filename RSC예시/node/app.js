const express = require("express");
const cors = require("cors");
const router = express.Router();
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
// get the client
// get the client
const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors());
const commentRouter = require("./router/comment-router");
const userRouter = require("./router/user-router");

//Router
app.use("/comment", commentRouter);
app.use("/user", userRouter);

app.listen(app.get("port"), () => {
	console.log(app.get("port"), "번 포트에서 대기 중");
});
