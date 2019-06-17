const express = require("express");
const router = express.Router();
const ProductController = require('./../controllers/product_controller');
const { celebrate, Joi } = require("celebrate");

router.get("/", (req, res, next) => {
    res.send("Welcome")
});

router.get("/products", ProductController.index);

router.post("/products", celebrate({
    body: {
        name: Joi.string().required(),
        price: Joi.number().greater(0)
    },
    query: {
        test: Joi.string().valid("garret").required()
    }
}), ProductController.create);

router.get("/products/:id", ProductController.show);

module.exports = router;