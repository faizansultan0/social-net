const express = require("express");
const {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
} = require("../controllers/auth");

const router = express.Router();

// Middleware
const { requireSignIn } = require("../middlewares");

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);
router.put("/profile-update", requireSignIn, profileUpdate);

module.exports = router;
