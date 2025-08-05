const express = require("express");
const AdminController = require("../Controller/Admin/AdminController")
const route = express.Router();

route.get("/status", AdminController.GetStatus)


module.exports = route