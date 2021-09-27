const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});
	try {
		const savedUser = await newUser.save();
		console.log(savedUser);
		res.status(201).json(savedUser);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//LOGIN

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		console.log(user);
		if (user === null) {
			res
				.status(401)
				.json("There is no user whose name is " + req.body.username);
		}

		const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
		const Originalpassword = decrypted.toString(CryptoJS.enc.Utf8);

		if (Originalpassword !== req.body.password) {
			res.status(401).json("Wrong Credentials");
		} else {
			const { password, ...others } = user._doc;
			res.status(200).json(others);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
