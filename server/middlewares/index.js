const Post = require('../models/post');
const { expressjwt: jwt } = require('express-jwt');

const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

const canEditDeletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        // console.log('Post in EDIT Delete Middleware: ', post);
        if(req.auth._id != post.postedBy) {
            return res.status(400).send('UnAuthorized Access');
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { requireSignIn, canEditDeletePost };