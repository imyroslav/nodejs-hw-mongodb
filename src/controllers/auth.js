import { registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";
import { ONE_DAY } from "../constants/index.js";
import { logoutUser } from "../services/auth.js";
import { sendResetEmail } from "../services/auth.js";
import { refreshUsersSession } from "../services/auth.js";
import { resetPassword } from '../services/auth.js';

// *********** User register ******************
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered an user!",
    data: user,
  });
};

// *************** User login ******************
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: "User logged in successfully!",
    data: {
      accessToken: session.accessToken,
    },
  });

};

// *************** User logout ****************
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send("User logged out successfully");
};

// **************** Send password reset email *********
export const sendResetEmailController = async (req, res) => {
  const email = req.body.email
  await sendResetEmail(email);

  res.json({
    status: 200,
    message: "Reset password email has been successfully sent!",
    data: {},
  })
}

// ****************** Password reset ****************
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: "Password was successfully reset!",
    status: 200,
    data: {},
  });
};

// ***************** Session refresh ****************
const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Session refreshed successfully!",
    data: {
      accessToken: session.accessToken,
    },
  });
};