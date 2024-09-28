import Joi from 'joi';

export const FindByIdSchema = Joi.object({
  id: Joi.string().trim().required(),
});
