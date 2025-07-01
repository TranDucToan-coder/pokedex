const express = require("express");
const LoginController = require("../Controller/UserController")
const MiddlewareController = require("../Controller/Middleware")
const route = express.Router();

route.get("/", MiddlewareController.middleware, LoginController.viewUser)
route.post("/login", LoginController.detailUser)
route.post("/insert", LoginController.addUser)
route.put("/updateprofile/:id",LoginController.updateUser)
route.put(".updatepassword/:id", LoginController.updatePassword)

module.exports = route