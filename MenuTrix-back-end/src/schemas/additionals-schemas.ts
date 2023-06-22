import Joi from 'joi';

export interface AdditionalType {
  nameAdditional: string;
  priceAdditional: number;
  isAvailable?: boolean;
}

export const additionalSchema = Joi.object<AdditionalType>({
  nameAdditional: Joi.string().required(),
  priceAdditional: Joi.number().required(),
});

export const availableAdditionalSchema = Joi.object<AdditionalType>({
  isAvailable: Joi.boolean().required(),
});

export const getAdditionalByNameSchema = Joi.object<AdditionalType>({
  nameAdditional: Joi.string().required(),
});
