const mongoose = require('mongoose');

// 🟢 **WISHLIST SCHEMA**
const WishlistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    }
}, { timestamps: true });

// 🟢 **Export the Wishlist model**
const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;
