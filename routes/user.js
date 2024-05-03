const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

// Define user routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
