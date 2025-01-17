const Cart = require('../models/CartModel'); // Import the Cart model
const mongoose = require('mongoose');
const addToCart = async (req, res) => {
    try {
      const { user, product, quantity, price } = req.body;
  
      // Validate user ID
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const existingItem = await Cart.findOne({ user, product });
  
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = price; // Update the price as well
        await existingItem.save();
        return res.status(200).json({
          message: 'Product quantity updated successfully in cart',
          cartItem: existingItem,
        });
      }
  
      const newCartItem = new Cart({ user, product, quantity, price });
      await newCartItem.save();
  
      res.status(201).json({
        message: 'Product added to cart successfully',
        cartItem: newCartItem,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error adding product to cart',
        error: error.message,
      });
    }
  };
  

const getCartByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Fetch cart items for the user and populate only valid fields
        const cartItems = await Cart.find({ user: userId })
            .populate('product', 'name category price stock image'); // Populate only 'product' field

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                message: 'No cart found for this user',
            });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
        res.status(500).json({
            message: 'Error fetching cart items',
            error: error.message,
        });
    }
};



// 🟢 **Update Cart Item Quantity**
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, cartItemId } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findOneAndUpdate(
            { _id: cartItemId, user: userId }, 
            { quantity }, 
            { new: true, runValidators: true }
        );

        if (!cartItem) {
            return res.status(404).json({ 
                message: 'Cart item not found' 
            });
        }

        res.status(200).json({ 
            message: 'Cart item quantity updated successfully', 
            cartItem 
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error updating cart item quantity', 
            error: error.message 
        });
    }
};

// 🟢 **Remove Product from Cart**
const removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;

        const deletedItem = await Cart.findByIdAndDelete(cartItemId);
        if (!deletedItem) {
            return res.status(404).json({ 
                message: 'Product not found in the cart' 
            });
        }

        res.status(200).json({ 
            message: 'Product removed from cart successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error removing product from cart', 
            error: error.message 
        });
    }
};

// 🟢 **Clear Cart for a User**
const clearCartByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedItems = await Cart.deleteMany({ user: userId });
        res.status(200).json({ 
            message: 'Cart cleared successfully', 
            deletedCount: deletedItems.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error clearing cart', 
            error: error.message 
        });
    }
};

module.exports = {
    addToCart,
    getCartByUser,
    updateCartItemQuantity,
    removeFromCart,
    clearCartByUser
};
