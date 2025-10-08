import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";

// ************ User register *******************
export const registerUser = async (payload) => {

  const user = await UsersCollection.findOne({
    email: payload.email
  });
  if (user) throw createHttpError[409]("Such email is already in use")

  const encryptedPassword = await bcrypt.hash(payload.password, 10)

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// ************* User login *****************
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError[401]("User not found");
  }
  const isEqual = await bcrypt.compare(payload.password, user.password); 

  if (!isEqual) {
    throw createHttpError[401]("Wrong password");
  }
}