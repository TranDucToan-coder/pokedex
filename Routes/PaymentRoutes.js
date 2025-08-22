const express = require("express");
const PaymentController = require("../Controller/Payment")
const route = express.Router();

route.post("/create_payment", PaymentController.CreatePayment)
route.post("/callback", PaymentController.CheckStatus)
route.post("/transaction", PaymentController.Transaction)
module.exports = route