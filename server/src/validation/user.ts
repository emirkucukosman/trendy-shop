import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a text",
    "string.empty": "Username can not be empty",
    "any.required": "Username is required",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "E-mail must be a text",
    "string.empty": "E-mail can not be empty",
    "string.email": "Please enter a valid e-mail address",
    "any.required": "E-mail is required",
  }),
  password: Joi.string().required().min(4).max(16).messages({
    "string.base": "Password must be a text",
    "string.empty": "Password can not be empty",
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password can not be maximum 16 characters long",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a text",
    "string.empty": "Username can not be empty",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a text",
    "string.empty": "Password can not be empty",
    "any.required": "Password is required",
  }),
});
