const express = require("express");
const {
	totalPosts,
	createPost,
	uploadImage,
	postsByUser,
	getPost,
	updatePost,
	deletePost,
	newsFeed,
	likePost,
	unlikePost,
	addComment,
	removeComment,
} = require("../controllers/post");
const router = express.Router();

const formidable = require("express-formidable");

// Middleware to require signin before creating a request
const { requireSignIn, canEditDeletePost } = require("../middlewares");

router.post("/create-post", requireSignIn, createPost);
router.post(
	"/upload-image",
	requireSignIn,
	formidable({ maxFileSize: 50 * 1024 * 1024 }),
	uploadImage
);

// Posts rendering
router.get("/user-posts", requireSignIn, postsByUser);

// Edit Post
router.get("/user-post/:_id", requireSignIn, getPost);
router.put("/update-post/:_id", requireSignIn, canEditDeletePost, updatePost);

// Delete Post
router.delete(
	"/delete-post/:_id",
	requireSignIn,
	canEditDeletePost,
	deletePost
);

// Render Posts
router.get("/news-feed/:page", requireSignIn, newsFeed);

router.get('/total-posts', requireSignIn, totalPosts);

// Like and Unlike
router.put("/like-post", requireSignIn, likePost);
router.put("/unlike-post", requireSignIn, unlikePost);

// Comments
router.put("/add-comment", requireSignIn, addComment);
router.put("/remove-comment", requireSignIn, removeComment);

module.exports = router;
