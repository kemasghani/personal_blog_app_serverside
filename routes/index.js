const express = require("express");
const router = express.Router();
const postRoutes = require("./post");
const userRoutes = require("./user");
const imageRoutes = require('./imageRoutes');

router.use("/post", postRoutes);
router.use("/user", userRoutes);
router.use("/image", imageRoutes);

module.exports = router;
