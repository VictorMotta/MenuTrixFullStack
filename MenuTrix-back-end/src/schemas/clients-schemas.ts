import { Client } from '@prisma/client';
import Joi from 'joi';

export type CreateClientSystemType = Pick<Client, 'name' | 'email' | 'telephone'> & {
  Address: {
    street: string;
    numberHouse: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  };
};

export const CreateClientSystemSchema = Joi.object<CreateClientSystemType>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  telephone: Joi.string().required(),
  Address: Joi.object({
    street: Joi.string().required(),
    numberHouse: Joi.string().required(),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    complement: Joi.string(),
  }).required(),
});
