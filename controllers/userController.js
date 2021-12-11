const User = require("../models/User");
const respMessage = require("../utils/respMessage");
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  var password = Math.floor(100000 + Math.random() * 900000);
  console.log(password);
  const user = new User({
    name: req.body.name,
    password
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' },);
    res.status(200).json(respMessage(true, { ...savedUser._doc, token }, "User created"));
  } catch (error) {
    res.status(400).json(respMessage(false, error, "User not created"));
  }
};

exports.loginUser = async (req, res) => {
  const isUserExist = await User.findById(req.body.id);

  if (!isUserExist) {
    return res.status(400).json(respMessage(false, "User not found", "Email not found"));
  }

  const isPasswordMatch = req.body.password === isUserExist.password;

  if (!isPasswordMatch) {
    return res.status(400).json(respMessage(false, "Password not match", "Password not match"));
  }
  const token = jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET, { expiresIn: '3d' },);
  res.status(200).json(respMessage(true, { user: isUserExist, token }, "Login success"));
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json(respMessage(true, user, "User found"));
  } catch (error) {
    res.status(400).json(respMessage(false, error, "User not found"));
  }
}