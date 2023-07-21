const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  //Check for existing user -> Done
  //Save Hashed Password -> Done
  //Create User -> Done
  //Token Generate

  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hashing code will run for 10 times

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    //token has 2 things - payload(to identify the user) and a secret key(used for encrypting the token)
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id, //this is the payload
      },
      SECRET_KEY
    );

    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id, //this is the payload
      },
      SECRET_KEY
    );
    res.status(200).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
