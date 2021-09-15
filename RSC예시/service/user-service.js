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
