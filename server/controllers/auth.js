const User = require('../models/user');
const { hashPassword } = require('../helpers/auth');

const register = async (req, res) => {
    // console.log(req.body);
    const { name, email, password, secret } = req.body;

    // Validations
    if(!name) return res.status(400).send('Name is required');
    if(!secret) return res.status(400).send('Answer is required');
    if(!password || password.length < 6 ) return res.status(400).send('Password is required and should be atleast 6 characters long');

    try{
        const exist = await User.findOne({ email });
        if(exist) return res.status(400).send('Email already exists')
        if(!email) return res.status(400).send('Email is required');
    } catch (err) {
        console.log('ERROR while checking for existing user: ', err);
    }

    // Hashing Password
    const hashedPassword = await hashPassword(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        secret,
    });

    try {
        await user.save();
        return res.status(200).json({
            ok: true,
        })
    } catch (err) {
        console.log(`Register User ERR: ${err}`);
        return res.status(400).send('Could not Register user. Try again!');
    }
};

module.exports = { register };