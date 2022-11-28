import Joi from 'joi';

export const userSchema = Joi.object()
  .keys({
    user_email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'sk', 'org', 'cz', 'hu'] },
      })
      .message(' Please enter valid e-mail address')
      .required(),

    user_name: Joi.string()
      .pattern(new RegExp('^[A-Za-zľščťžýáíé\\s]+$'))
      .message(' Username must contain only letters')
      .min(2)
      .message(' Minimal username length is two')
      .max(14)
      .message(' Minimal username length is fourteen')
      .required(),
    user_password: Joi.string()
      .min(7)
      .message(' Minimal password length is seven')
      .required(),
    repeat_password: Joi.any()
      .valid(Joi.ref('user_password'))
      .required()
      .messages({
        'any.only': ' Password must match',
      }),
    age: Joi.number().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    height: Joi.number().optional(),
    weight: Joi.number().optional(),
    eye_color: Joi.string().optional(),
    country: Joi.string().required(),
    additional_info: Joi.string().optional().empty(''),
  })
  .options({ abortEarly: false });
