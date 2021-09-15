const CommentService = require("../service/comment-service");

exports.getComments = async (req, res, next) => {
	try {
		const result = await CommentService.getComments();
		res.json(result);
	} catch (err) {
		res.status(500).json(err);
	}
};
exports.postComment = async (req, res, next) => {
	const result = await CommentService.postComment(
		req.body.commenter,
		req.body.comment
	);
	console.log(req.body);

	res.send(result);
};

// router
// 	.get("/", async (req, res) => {
// 		console.log("here");
// 		const [userList, fields] = await pool.query(
// 			"SELECT comments.id, users.name, comments.comment FROM comments JOIN users on comments.commenter = users.id"
// 		);
// 		res.json(userList);
// 	})
// 	.post("/", async (req, res, next) => {
// 		const [results, fields] = await pool.query(
// 			"INSERT INTO comments(commenter,comment) values (? , ?)",
// 			[req.body.commenter, req.body.comment]
// 		);
// 		const [results2, fields2] = await pool.query(
// 			"SELECT name from users where id = ?",
// 			[req.body.commenter]
// 		);
// 		const result = req.body;
// 		result.id = results.insertId;
// 		result.name = results2[0].name;

// 		res.status(201).json(result);
// 	});
