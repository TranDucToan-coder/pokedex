const express = require("express");
const OrderController = require("../Controller/OrderController")
const MiddlewareController = require("../Controller/Middleware")
const route = express.Router();

route.get("/:id", OrderController.OrderByUser);

module.exports = route