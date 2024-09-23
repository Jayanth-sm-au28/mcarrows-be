const Joi = require("joi");

const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin"),
});
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(404).json({ message: "User Already exists" });
  }
  const newUser = new User({ name, email, password, role });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const newToken = new Token({
    token,
    userId: newUser._id,
    expiresAt: new Date(Date.now() + 3600000),
  });
  await newToken.save();

  res.status(201).json({ message: "User created", newUser, token });
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;

    // Save updated user
    await user.save();

    return res.json({ message: "User updated", user });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.json({ message: "User deleted" });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
