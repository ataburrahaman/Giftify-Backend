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
      lastName = "",
	  mobile=""
    } = req.body;

    if (!email && !email.length > 30) {
      return res.status(200).json({ message: "Enter Valid Email", success: false });
    }
    if (firstName.length > 30) {
      return res.status(200).json({ message: "Enter Valid Name", success: false });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({ message: "User Already exists" , success: false});
    }
	if (mobile && mobile.length === 9) {
		return res.status(200).json({ message: "Mobile No Not Valid" , success: false});
	  }
    //encrypt password and save new user
    const body = {
      email,
      password,
      firstName,
      lastName,
	  phoneNumber: mobile
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
      .send({ user :{ name: newUser.firstName, uidx: newUser._id }, success: true });
    // res.json({
    // 	token,
    // 	username: newUser.firstName,
    // });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: error.message, success: false });
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
      .send({ user :{name: user.firstName, uidx: user._id}, success: true });
  } catch (error) {
    return res.status(401).json({ error: error.message, success: false });
  }
};

const getAuth=async (req, res, next)=>{
	const userId= req.userId;
	const user = await User.findOne({ _id: userId });
	if(user){
		const { email,  firstName, lastName, _id } = user;
		res.send({ user :{name : firstName, uidx:_id }, success: true });
	}
}

module.exports = {
  signupUser,
  loginUser,
  getAuth
};
