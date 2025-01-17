const Product = require('../models/ProductModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({ 
            message: 'Product created successfully', 
            product: savedProduct 
        });
    } catch (error) {
        res.status(500).json({ 
            errorMessage: 'Failed to create product', 
            errorDetails: error.message 
        });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ 
            errorMessage: 'Failed to fetch products', 
            errorDetails: error.message 
        });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ errorMessage: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ 
            errorMessage: 'Failed to fetch product', 
            errorDetails: error.message 
        });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ errorMessage: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ 
            errorMessage: 'Failed to update product', 
            errorDetails: error.message 
        });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ errorMessage: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            errorMessage: 'Failed to delete product', 
            errorDetails: error.message 
        });
    }
};
