const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  let { username, email, password, avatar } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists,try logging in", user: user });
    }
    let userWithUsername = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({
        message: "User already exists,try logging in",
        user: userWithUsername,
      }); //username should be unique as well
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Could not hash password!" });
      }

      let newUser = new User({
        email: email,
        password: hash,
        avatar: avatar
          ? avatar
          : "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", //dummy image
        username: username,
      });
      await newUser.save();
      console.log(newUser);

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
  } catch (e) {
    res.status(400).json({ message: "Could not create new user", error: e });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exists,try registering with a new email",
      });
    }
    // console.log(user);

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Password" });
      }
      console.log(result);
      let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
      return res
        .status(200)
        .json({ message: "User loggedIn successfully", token, user });
    });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Could not login, Invalid Credentials", error: e });
  }
};

exports.logout = async (req, res) => {};
