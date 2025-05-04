const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController")

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout)
router.get("/getProfile", userController.getProfile);
router.get("/statistics", userController.getUserStatistics);
router.put("/updateprofile", userController.updateProfile);

module.exports = router;
