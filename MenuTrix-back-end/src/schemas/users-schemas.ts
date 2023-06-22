import { ReqBody } from '@/controllers';
import { BodyUser, SignInUser } from '@/protocols/types';
import Joi from 'joi';

export const createUserSchema = Joi.object<BodyUser>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .length(11)
    .required(),
  password: Joi.string().min(6).max(36).required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const signInUserSchema = Joi.object<SignInUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(36).required(),
});
