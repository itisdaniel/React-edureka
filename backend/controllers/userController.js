const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    console.log("req.body.role => ", req.body.role);
    const hashPassword = bcrypt.hashSync(req.body.password, 6);
    const payload = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      age: req.body.age,
      entry_year: req.body.entry_year,
      profile_pic: req.body.profile_pic,
      current_city: req.body.current_city,
      phone: req.body.phone,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    };

    const user = new UserModel(payload);
    const isEmail = await UserModel.findOne({ email: req.body.email });
    if (isEmail) {
      res.json({
        status: "Error",
        message: "Email already exist...",
      });
    } else if (req.body.password.length < 4) {
      res.json({
        status: "Error",
        message: "Password too short, atleast 4 characters",
      });
    } else {
      await user.save();
      res.json({ status: "success", data: user });
    }
  } catch (err) {
    console.log("Error: ", err.message);
    res.json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "Email not found" });
    console.log("user... ", user.email);

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      console.log("Is password matched? ", isMatch);

      if (!isMatch) return res.json({ status: `Wrong password` });

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2hr" }
      );

      console.log("Login token: ", token);

      res.json({
        status: `success`,
        message: `You're successfully signed in...`,
        token: token,
      });
    } else {
      res.json({ status: "Invalid email or password" });
    }
  } catch (err) {
    console.log("Catch Error: ", err);
    res.json({ status: "Error...", message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({});

  try {
    res.json({ status: "success", users: users });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
};

exports.findUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    res.json({ status: "success", user: user });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
};
