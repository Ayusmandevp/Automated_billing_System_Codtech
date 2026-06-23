const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  updateStock,
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.put("/stock/:id", updateStock);

module.exports = router;