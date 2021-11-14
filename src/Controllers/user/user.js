const User = require("../../Schema/user/user");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { generateAuthToken } = require("../../Utils/Authorization");

const signupUser = async (req, res) => {
  try {
    //check if user exists
    const {
      email = "",
      password = "",
      firstName = "",
      lastName = ""
    } = req.body;
    if (!email && !email.length < 30) {
      return res.json({ message: "Enter Valid Email" });
    }
    if (firstName.length > 30) {
      return res.json({ message: "Enter Valid Name" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ message: "User Already exists" });
    }
    //encrypt password and save new user
    const body = {
      email,
      password,
      firstName,
      firstName
    };
    const newUser = new User(body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    //generate token
    // const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
    // 	expiresIn: '24h',
    // });
    const token = generateAuthToken(newUser._id);

    res
      .cookie("token", token, { maxAge: 1000 * 60 * 60 * 1, httpOnly: true, secure: false })
      .send({ name: newUser.firstName });
    // res.json({
    // 	token,
    // 	username: newUser.firstName,
    // });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist, Signup to enter");
    }

    //decrypt password and validate
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email and password does not match");
    }
    //generate token
    // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    //   expiresIn: "24h"
    // });

    // res.json({
    //   token,
    //   username: user.firstName
    // });
    const token = generateAuthToken(user._id);
	req.session.userId = user._id;
    res
      .cookie("token", token, { maxAge: 1000 * 60 * 60 * 60, httpOnly: true, secure: false })
      .send({ name: user.firstName });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser
};
