import { StatusCodes } from "http-status-codes";
import UserModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const Register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Register Successful" });
};

export const Login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email not found please register first" });
  }
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id });
  user.password = null;
  user._id = null;
  const oneDay = 1000 * 60 * 60 * 24;

  res
    .status(StatusCodes.OK)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    })
    .json({ user, msg: "Login Successful" });
};

export const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const getUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Your Account maybe delete or something went wrong" });
  }

  user.password = null;
  user._id = null;
  return res.status(StatusCodes.OK).json({ user });
};
