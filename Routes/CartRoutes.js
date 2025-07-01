const express = require("express");
const CartController = require("../Controller/CartController")
const route = express.Router();

route.post("/insert", CartController.addCart)
route.post("/insertDetail", CartController.addDetailCart)


module.exports = route