const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true, unique: true },
		products: [
			{
				productId: {
					tpye: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		amount: { type: Number, required: true },
		address: { type: Object, required: true },
		status: { type: String, defaule: "pending" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
