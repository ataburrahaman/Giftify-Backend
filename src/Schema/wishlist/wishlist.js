const mongoose = require('mongoose');
const { Schema } = mongoose;

const childSchema = new Schema({
	productDetails: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
    productId:{
        type: Number
      },
});

const wishlistSchema = new Schema(
	{
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		wishlistItems: [childSchema],
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Wishlist', wishlistSchema);