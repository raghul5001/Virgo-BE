// Import required modules
const mongoose = require('mongoose');

// CATEGORY SCHEMA
const CategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        maxlength: 255 
    },
    parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        default: null 
    },
    description: { 
        type: String, 
        default: '' 
    },
    is_active: { 
        type: Boolean, 
        default: true 
    },
}, { timestamps: true });

// Get all active subcategories for the current category
CategorySchema.methods.getSubcategories = function() {
    return mongoose.model('Category').find({ parent: this._id, is_active: true });
};

// Get all ancestor categories up to the root
CategorySchema.methods.getAncestors = async function() {
    const ancestors = [];
    let currentCategory = this;
    while (currentCategory && currentCategory.parent) {
        currentCategory = await mongoose.model('Category').findById(currentCategory.parent);
        if (currentCategory) ancestors.push(currentCategory);
    }
    return ancestors;
};

// Get all descendant categories down to the leaf nodes
CategorySchema.methods.getDescendants = async function() {
    const descendants = await mongoose.model('Category').find({ parent: this._id });
    let allDescendants = [...descendants];
    for (const descendant of descendants) {
        const subDescendants = await descendant.getDescendants();
        allDescendants = allDescendants.concat(subDescendants);
    }
    return allDescendants;
};

// Properly define and export the Category model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
