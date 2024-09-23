const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", auth, admin, updateUser);

router.delete("/:id", auth, admin, deleteUser);

module.exports = router;
