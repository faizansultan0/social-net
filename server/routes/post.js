const express = require('express');
const { createPost, uploadImage } = require('../controllers/post');
const router = express.Router();

const formidable = require("express-formidable");

// Middleware to require signin before creating a request
const { requireSignIn } = require("../middlewares/auth");

router.post('/create-post', requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 50 * 1024 * 1024 }),
  uploadImage
);

module.exports = router;