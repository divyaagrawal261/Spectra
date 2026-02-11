
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = user =>
  jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

/* Signup */
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  console.log("Signup request:", req.body);

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = await User.create({ email, password, name });
  const token = generateToken(user);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  });
};

/* Login */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  });
};
