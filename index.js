const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./DB/dbConnect");
const userRoutes = require("./userRoutes");

dotenv.config();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("api is running");
});
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
