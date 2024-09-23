const express = require("express");
const router = express.Router();

const { auth, admin } = require("../middleware/authMiddleware");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");


router.get("/", getUsers);

router.post("/", createUser);

router.put("/:userId", auth, admin,updateUser);

router.delete("/:id", auth, admin, deleteUser);

module.exports = router;
