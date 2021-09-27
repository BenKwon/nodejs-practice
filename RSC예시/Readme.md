# Node.js 코딩 패턴 (Routes-Controllers-Services 구조)
> RCS구조이용한 User(추가)와 Comment(추가) 기능 구현 예제
```
├───routes
│   ├───user-route.js
├───services
│   ├───user-service.js
├───controllers
│   ├───user-controller.js
├───app.js
```

## Code
#### ./app.js
```js
const express = require("express");

/** 
 skip
**/

//라우터 import
const commentRouter = require("./router/comment-router");
const userRouter = require("./router/user-router");

//라우터 등록
app.use("/comment", commentRouter);
app.use("/user", userRouter);
```
#### ./router/user-router.js
```js
const express = require("express");
const router = express.Router();
const UserController = require("../controller/user-controller");
router.get("/:id", UserController.getUser);
router.get("/", UserController.getUsers);
router.post("/", UserController.postUser);

module.exports = router;

```
#### ./controller/user-controller.js
```js
const UserService = require("../service/user-service");
exports.getUser = async (req, res, next) => {
	const result = await UserService.getUser(req.params.id);
	console.log(result);
	res.json(result);
};
exports.getUsers = async (req, res, next) => {
	const result = await UserService.getUsers(req.params.id);
	res.json(result);
};

exports.postUser = async (req, res, next) => {
	const user = {
		name: req.body.name,
		age: req.body.age,
		married: req.body.married,
	};
	const result = await UserService.postUser(user);
	res.json(result);
};

```
#### ./service/user-service.js
```js
const pool = require("../database/pool");

exports.getUser = async (id) => {
	const [user, fields] = await pool.query("SELECT * FROM users WHERE id = ?", [
		id,
	]);
	return user;
};

exports.getUsers = async () => {
	const [userList, fields] = await pool.query("SELECT * FROM users");
	return userList;
};

exports.postUser = async (user) => {
	const [results, fields] = await pool.query(
		"INSERT INTO users(name,age,married) values (? , ?  , ?)",
		[user.name, user.age, user.married]
	);
	user.id = results.insertId;
	console.log(user);
	return user;
};

```
