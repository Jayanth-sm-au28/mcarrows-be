const express = require("express");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

// Register the admin route
app.use("/admin", adminRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () =>
  console.log(`Server running on port 5000 ,${process.env.MONGO_URI}`)
);
