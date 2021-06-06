import Joi from "joi";

export const getAllProductsSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "Product ID must be a text",
    "string.empty": "Product ID can not be empty",
    "any.required": "Product ID is required",
  }),
});
