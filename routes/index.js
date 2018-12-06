const express = require("express");
const router = express.Router();
const ProductController = require('./../controllers/product_controller');

router.get("/", (req, res) => res.send("Welcome"));

router.get("/products", ProductController.index);

router.post("/products", ProductController.create);

router.get("/products/:id", ProductController.show);

module.exports = router;