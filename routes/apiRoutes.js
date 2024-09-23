

const express = require("express");
const router = express.Router();

const {
  fetchDataFromApis
} = require("../controllers/apiControllers");


router.get("/", fetchDataFromApis);
module.exports = router;


