const Post = require("../models/post");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const createPost = async (req, res) => {
  // console.log('Post Body: ', req.body);
  const { content, image } = req.body;
  if (!content) {
    return res.json({
      error: "Content is Required!",
    });
  }

  try {
    const post = new Post({ content, postedBy: req.auth._id, image });
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const uploadImage = async (req, res) => {
  //   console.log("Req Files: ", req.files);
  try {
    const result = await cloudinary.v2.uploader.upload(req.files.image.path);

    console.log("uploaded image url: ", result);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};

const postsByUser = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.auth._id })
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 });

    // console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

const getPost = async (req, res) => {
  console.log("req id", req.params._id);
  const _id = req.params._id;

  try {
    const post = await Post.findById(_id);

    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  // console.log('Post Update Body: ', req.body)
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createPost, uploadImage, postsByUser, getPost, updatePost };
