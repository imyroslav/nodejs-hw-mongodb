import Joi from "joi";


// ************** User register *****************
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});


// ***************** User login **************
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


// ************** Send password reset email *********
export const sendResetEmailSchema = Joi.object({
    email: Joi.string().min(3).max(20).messages({
        "string.base": "E-mail should be a string",  
        "string.min": "E-mail should have at least {#limit} characters",
        "string.max": "E-mail should have maximum {#limit} characters",
    }),
})