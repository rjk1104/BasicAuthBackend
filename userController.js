const generateToken = require("./generateToken");
const asyncHandler = require("express-async-handler");
const User = require("./DB/userModel");
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    console.log(user);
    res.status(201).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User cannot be created");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user.email, email, user.password, password);
  if (user && user.email === email && user.password === password) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);

    throw new Error(
      "This combination of email and password does not exist in the system"
    );
  }
});

module.exports = { registerUser, authUser };
