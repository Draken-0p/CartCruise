import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: "Not Authorised, Token failed" });
    }
  }

  if (!token) {
    res.status(401).send({ message: "Not authorized, no token" });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin === "true") {
    next();
  } else {
    res.status(401).send({ message: "Not Authorized as an Admin" });
  }
};

export { protect, admin };
