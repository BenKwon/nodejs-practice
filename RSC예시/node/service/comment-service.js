const pool = require("../database/pool");

exports.getComments = async () => {
	const [userList, fields] = await pool.query(
		"SELECT comments.id, users.name, comments.comment FROM comments JOIN users on comments.commenter = users.id"
	);
	console.log("comment-service");
	console.log(userList);

	return userList;
};

exports.postComment = async (commenter, comment) => {
	console.log("commenter", comment);
	const [results, fields] = await pool.query(
		"INSERT INTO comments(commenter,comment) values (? , ?)",
		[commenter, comment]
	);
	console.log("commenter", commenter);

	const [results2, fields2] = await pool.query(
		"SELECT name from users where id = ?",
		[commenter]
	);
	const result = {
		id: results.insertId,
		name: results2[0].name,
		commenter: commenter,
		comment: comment,
	};

	return result;
};
