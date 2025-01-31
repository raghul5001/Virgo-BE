const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// 🟢 **PRODUCT**
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controller/ProductController');



// 🟢 **Category Controller Imports**
const { 
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require('../controller/CategoryController');



// 🟢 **Wishlist Controller Imports**
const { 
    addToWishlist, 
    getWishlistByUser, 
    removeFromWishlist, 
    clearWishlistByUser 
} = require('../controller/WishlistController'); 

// 🟢 **Cart Controller Imports**
const { 
    addToCart, 
    getCartByUser, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCartByUser 
} = require('../controller/CartController'); 



// 🟢 **Product Routes**
router.post('/addproduct',createProduct);
router.get('/getproducts',getAllProducts);
router.get('/getproduct/:id',getProductById);
router.put('/updateproduct/:id',updateProduct);
router.delete('/deleteproduct/:id',deleteProduct);




// 🟢 **Category Routes**
router.post('/addcategory',  createCategory);  
router.get('/getcategory',getAllCategories);  
router.get('/getcategory/:id',  getCategoryById);  
router.put('/updatecategory/:id',  updateCategory);  
router.delete('/delete/:id',  deleteCategory);  



// 🟢 **Wishlist Routes** 
router.post('/addwishlist',  addToWishlist);  
router.get('/getwishlist/:userId',  getWishlistByUser);  
router.delete('/removewishlist/:userId/:productId', removeFromWishlist);  
router.delete('/clearwishlist/:userId',  clearWishlistByUser);  


// 🟢 **Cart Routes** 
router.post('/addcart', addToCart);  
router.get('/getcart/:userId',  getCartByUser);  
router.put('/updatecart/:userId/:cartItemId', updateCartItemQuantity);  
router.delete('/removecart/:cartItemId',  removeFromCart);  
router.delete('/clearcart/:userId', clearCartByUser);  


router.post('/user', authController.saveOrRetrieveUser);

module.exports = router;
