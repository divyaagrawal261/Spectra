import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { email, name } = req.body;

  const user = await User.create({ email, name });

  res.status(201).json(user);
};
