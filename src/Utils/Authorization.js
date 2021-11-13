var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Schema/user/user");

const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorised access, please add the token" });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).send("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};

const generateToken = async (req, res, next) => {
  const newUser = new User(body);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  //generate token
  const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "24h"
  });
};

const generateAuthToken = (_id) => {
  const token = jwt.sign(
    {
      userId: _id
    },
    process.env.SECRET_KEY,
    { expiresIn: "15m" }
  );
  return token;
};

module.exports = {
  isAuthorized,
  generateToken,
  generateAuthToken
};
