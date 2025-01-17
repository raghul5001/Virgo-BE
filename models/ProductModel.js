// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true, maxlength: 255 },
//     description: { type: String, required: true },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//     sku: { type: String, required: true, maxlength: 100 },
//     original_price: { type: mongoose.Decimal128, required: true },
//     current_price: { type: mongoose.Decimal128, required: true },
//     size: { type: String, maxlength: 50 },
//     weight: { type: mongoose.Decimal128, max: 999.99 },
//     burning_time: { type: String, maxlength: 50 },
//     color: { type: String, maxlength: 50 },
//     fragrance: { type: String, maxlength: 100 },
//     in_the_box: { type: String },
//     stock: { type: Number, required: true, min: 0 },
//     tags: { type: String, maxlength: 255, default: '' },
//     image_url: { type: String, default: null }
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    sku: { type: String, required: true, maxlength: 100 },
    original_price: { type: mongoose.Decimal128, required: true },
    current_price: { type: mongoose.Decimal128, required: true },
    size: { type: String, maxlength: 50 },
    weight: { type: mongoose.Decimal128, max: 999.99 },
    burning_time: { type: String, maxlength: 50 },
    color: { type: String, maxlength: 50 },
    fragrance: { type: String, maxlength: 100 },
    in_the_box: { type: String },
    stock: { type: Number, required: true, min: 0 },
    tags: { type: String, maxlength: 255, default: '' },
    image_url: { type: String, default: null },
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
