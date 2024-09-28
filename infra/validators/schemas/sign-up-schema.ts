import Joi from 'joi';

export const SignUpSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phoneNumber: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password:  Joi.string().trim().min(6).required(),
  confirmPassword:  Joi.string().trim().min(6).required(),
});
