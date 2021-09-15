const mysql = require("mysql2");
const dbsecret = require("../config/config.json"); //git에 올릴 때 비밀번호가 유출되지 않게 하기 위해
const pool = mysql.createPool(
	dbsecret //db.json이라는 파일에서 mysql 정보를 가져옵니다.
);

const promisePool = pool.promise();

module.exports = promisePool;
