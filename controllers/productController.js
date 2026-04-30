const Product = require('../models/Product');

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE product
exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        gallery: req.body.gallery,
        features: req.body.features,
        benefits: req.body.benefits,
        price: req.body.price,
        boxPrice: req.body.boxPrice,
        frontPageOptions: req.body.frontPageOptions,
        sizes: req.body.sizes,
        paperTypes: req.body.paperTypes,
        bindingTypes: req.body.bindingTypes,
        boxFinishes: req.body.boxFinishes,
        colors: req.body.colors
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (req.body.name != null) product.name = req.body.name;
        if (req.body.category != null) product.category = req.body.category;
        if (req.body.description != null) product.description = req.body.description;
        if (req.body.image != null) product.image = req.body.image;
        if (req.body.gallery != null) product.gallery = req.body.gallery;
        if (req.body.features != null) product.features = req.body.features;
        if (req.body.benefits != null) product.benefits = req.body.benefits;
        if (req.body.price != null) product.price = req.body.price;
        if (req.body.boxPrice != null) product.boxPrice = req.body.boxPrice;
        if (req.body.frontPageOptions != null) product.frontPageOptions = req.body.frontPageOptions;
        if (req.body.sizes != null) product.sizes = req.body.sizes;
        if (req.body.paperTypes != null) product.paperTypes = req.body.paperTypes;
        if (req.body.bindingTypes != null) product.bindingTypes = req.body.bindingTypes;
        if (req.body.boxFinishes != null) product.boxFinishes = req.body.boxFinishes;
        if (req.body.colors != null) product.colors = req.body.colors;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
