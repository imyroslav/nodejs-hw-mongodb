import { registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";
import { ONE_DAY } from "../constants/index.js";

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