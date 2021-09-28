const router = require("express").Router();
const Cart = require("../models/Cart");

const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
	console.log(req.body);
	const newCart = new Cart(req.body);
	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updatedCart = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET USER CART모두가 열람 가능
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.params.userId });
		res.status(200).json(cart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// //GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).send(carts);
	} catch (err) {
		res.status(500).json(err);
	}
});
// router.get("/", async (req, res) => {
// 	const qNew = req.query.new;
// 	const qCategory = req.query.category;

// 	try {
// 		let products;
// 		if (qNew) {
// 			products = await Product.find().sort({ createdAt: -1 }).limit(1);
// 		} else if (qCategory) {
// 			products = await Product.find({
// 				categories: {
// 					$in: [qCategory],
// 				},
// 			});
// 		} else {
// 			products = await Product.find();
// 		}

// 		res.status(200).json(products);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// //GET USER STATS
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
// 	const date = new Date();
// 	const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

// 	try {
// 		const data = await User.aggregate([
// 			{ $match: { createdAt: { $gte: lastYear } } },
// 			{
// 				$project: {
// 					month: { $month: "$createdAt" },
// 				},
// 			},
// 			{
// 				$group: {
// 					_id: "$month",
// 					total: { $sum: 1 },
// 				},
// 			},
// 		]);
// 		res.status(200).json(data);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });
module.exports = router;
