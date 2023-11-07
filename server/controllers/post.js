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

        console.log('uploaded image url: ', result);

        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        })
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createPost, uploadImage };
