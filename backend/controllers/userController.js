import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth User & get token
//@route POST http://localhost:5000/api/users/login
//@access Public

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  console.log(user)

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ message: "Invalid Password or Email" });
  }
});

//@desc get user Profile
//@route get http://localhost:5000/api/users/profile
//@access Private

const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

//@desc Register a new User
//@route POST http://localhost:5000/api/users
//@access Public

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).send({ message: "Email Already Exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({ message: "Invalid User Data" });
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

//@desc Update user Profile
//@route PUT http://localhost:5000/api/users/profile
//@access Private

const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

//@desc Get all user
//@route Get http://localhost:5000/api/users
//@access Private/Admin

const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    res.status(404).send({ message: "Admin Not Found" });
  }
});

//@desc Delete User
//@route DELETE http://localhost:5000/api/users/:id
//@access Private/Admin

const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "user Removed" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

//@desc Get user by ID
//@route Get http://localhost:5000/api/users/id
//@access Private/Admin

const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "Admin Not Found" });
  }
});

//@desc Update user
//@route PUT http://localhost:5000/api/users/:id
//@access Private/Admin

const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
