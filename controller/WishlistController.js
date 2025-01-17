const Wishlist = require('../models/WishlistModel'); // Import the Wishlist model

// 🟢 **Add Product to Wishlist**
const addToWishlist = async (req, res) => {
    try {
        const { user, product } = req.body;

        // Check if the product already exists in the user's wishlist
        const existingItem = await Wishlist.findOne({ user, product });
        if (existingItem) {
            return res.status(400).json({ 
                message: 'Product already exists in the wishlist' 
            });
        }

        const newWishlistItem = new Wishlist({ user, product });
        await newWishlistItem.save();

        res.status(201).json({ 
            message: 'Product added to wishlist successfully', 
            wishlistItem: newWishlistItem 
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error adding product to wishlist', 
            error: error.message 
        });
    }
};

// 🟢 **Get Wishlist for a User**
const getWishlistByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await Wishlist.find({ user: userId }).populate('product');
        if (!wishlist) {
            return res.status(404).json({ 
                message: 'No wishlist found for this user' 
            });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching wishlist', 
            error: error.message 
        });
    }
};

// 🟢 **Remove Product from Wishlist**
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const deletedItem = await Wishlist.findOneAndDelete({ user: userId, product: productId });
        if (!deletedItem) {
            return res.status(404).json({ 
                message: 'Product not found in the wishlist' 
            });
        }

        res.status(200).json({ 
            message: 'Product removed from wishlist successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error removing product from wishlist', 
            error: error.message 
        });
    }
};

// 🟢 **Clear Wishlist for a User**
const clearWishlistByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedItems = await Wishlist.deleteMany({ user: userId });
        res.status(200).json({ 
            message: 'Wishlist cleared successfully', 
            deletedCount: deletedItems.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error clearing wishlist', 
            error: error.message 
        });
    }
};

module.exports = {
    addToWishlist,
    getWishlistByUser,
    removeFromWishlist,
    clearWishlistByUser
};
