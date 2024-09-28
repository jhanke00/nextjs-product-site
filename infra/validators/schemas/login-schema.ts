import Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password:  Joi.string().trim().required()
});
