const Product = require("../models/Product");

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.stock = product.stock - quantity;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  updateStock,
};