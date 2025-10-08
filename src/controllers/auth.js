import { registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";

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
  await loginUser(req.body);


  res.status(201).json({
    status: 201,
    message: "Successfully loged in an user!",
  });


};