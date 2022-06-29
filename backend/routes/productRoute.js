const express = require("express");
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const isAuthenticatedUser = require("../middleware/auth");
const router = express.Router();


//Get Route
router.route("/products").get(isAuthenticatedUser, getAllProducts);

//Post Route
router.route("/product/new").post(createProduct);

//Update Route 
router.route("/product/:id").put(updateProduct);

// For Delete
router.route("/product/:id").delete(deleteProduct);

//GetProduct Details
router.route("/product/:id").get(getProductDetails);

//as both update getProductDetails and delete has same route we can also write this as
//router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);


module.exports = router