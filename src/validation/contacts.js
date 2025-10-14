import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const postContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        "string.base": "Username should be a string",
        "string.min": "Username should have at least {#limit} characters",
        "string.max": "Username should have maximum {#limit} characters",
        "any.required": "Username is required",
    }),
    phoneNumber: Joi.string().min(3).max(20).required().messages({
        "string.base": "Phone number should be a string",  
        "string.min": "Phone number should have at least {#limit} characters",
        "string.max": "Phone number should have maximum {#limit} characters",
        "any.required": "Phone number is required",
    }),
    email: Joi.string().min(3).max(20).messages({
        "string.base": "E-mail should be a string",  
        "string.min": "E-mail should have at least {#limit} characters",
        "string.max": "E-mail should have maximum {#limit} characters",
    }),
    isFavourite: Joi.boolean().messages({
        "boolean.base": "isFavourite is not a boolean value",
    }),
    contactType: Joi.string().valid("work", "home", "personal").default("personal").required().messages({
        "string.base": "Contact type should be a string",
        "any.only": "Contact type should match to the list of valid values",
        "any.required": "Contact type is required",
    }),
    userId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
            return helper.message("User id should be a valid mongo id")
        }
        return true;
    }),
});
export const patchContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        "string.base": "Username should be a string",
        "string.min": "Username should have at least {#limit} characters",
        "string.max": "Username should have maximum {#limit} characters",
    }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        "string.base": "Phone number should be a string",  
        "string.min": "Phone number should have at least {#limit} characters",
        "string.max": "Phone number should have maximum {#limit} characters",
    }),
    email: Joi.string().min(3).max(20).messages({
        "string.base": "E-mail should be a string",  
        "string.min": "E-mail should have at least {#limit} characters",
        "string.max": "E-mail should have maximum {#limit} characters",
    }),
    isFavourite: Joi.boolean().messages({
        "boolean.base": "isFavourite is not a boolean value",
    }),
    contactType: Joi.string().valid("work", "home", "personal").default("personal").messages({
        "string.base": "Contact type should be a string",
        "any.only": "Contact type should match to the list of valid values",
    }),
});

