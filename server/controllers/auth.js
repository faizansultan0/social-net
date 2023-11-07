const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password, secret } = req.body;

  // Validations
  if (!name) {
    return res.json({
        error: 'Name is required'
    })
  };
  if (!secret) {
    return res.json({
        error: 'Answer is required'
    })
    }
  if (!password || password.length < 6) {
    return res.json({
        error: 'Password is required and should be atleast 6 characters long'
    })
  }

  if (!email) {
    return res.json({
        error: 'Email is Required'
    })
  };

  try {
    const exist = await User.findOne({ email });
    if (exist) {
        res.json({
            error: 'Email is taken'
        })
    }
  } catch (err) {
    console.log("ERROR while checking for existing user: ", err);
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
    });
  } catch (err) {
    console.log(`Register User ERR: ${err}`);
    return res.status(400).send("Could not Register user. Try again!");
  }
};

const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;

    // Check in DB if a user with given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User found with the given Email Address!"
        });
    }

    // Password Check
    const match = await comparePassword(password, user.password);
    if (!match) {
        return res.json({
          error: "Wrong Password!"
          });
      };

    // If all ok, generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // 20 * 60 = 1200 = 20sec
    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log("Login req data reading error: ", err);
    res.json({
        error: "Error! Try Again"
    });
  }
};

const currentUser = async (req, res) => {
//   console.log(req.auth);

  try {
    let u = req.auth;

    let user = await User.findById(req.auth._id);
    res.status(200).json({ ok: true });
  } catch (err) {
    // console.log("User Authentication ERR: ", err);
    res.status(400).send("Unauthorized Request");
  }
};

const forgotPassword = async (req, res) => {
    // console.log(req.body);
    const { email, secret, newPassword } = req.body;
    
    if(!email) {
        return res.json({
            error: 'Email is required'
        })
    }

    if(!secret) {
        return res.json({
            error: 'Secret is required'
        })
    }

    if(!newPassword || newPassword < 6) {
        return res.json({
            error: 'New Password is required and should be atleast 6 characters long'
        })
    }

    const user = await User.findOne({email, secret});

    if(!user) {
        return res.json({
            error: `We can't verify you with given details`
        })
    }

    try {
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {password: hashed})

        return res.json({
            success: 'Congrats! Now you can login with your new password'
        })
    } catch(err) {
        console.log(err);
        return res.json({
            error: 'Something went wrong. Try again'
        })
    }
};

module.exports = { register, login, currentUser, forgotPassword };
