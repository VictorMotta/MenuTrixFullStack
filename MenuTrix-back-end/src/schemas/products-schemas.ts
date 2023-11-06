import Joi from 'joi';

export interface ProductBody {
  name: string;
  photoProduct: string;
  price: number;
  description: string;
  hasMeatPoint?: boolean;
  additionals: { id: number }[];
  category: string;
}

export interface AvailableProductBody {
  isAvailable: boolean;
}

export type UpdateProductBody = {
  name: string;
  photoProduct: string;
  price: number;
  description: string;
  ProductAdditional: {
    id: number; name: string ;
  }[];
};

export const CreateProductSchema = Joi.object<ProductBody>({
  name: Joi.string().required(),
  photoProduct: Joi.string().uri().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  hasMeatPoint: Joi.boolean(),
  additionals: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
    })
  ),
  category: Joi.string().required(),
});

export const AvailableProductSchema = Joi.object<AvailableProductBody>({
  isAvailable: Joi.boolean().required(),
});

export const updateProductSchema = Joi.object<UpdateProductBody>({
  name: Joi.string().required(),
  photoProduct: Joi.string().uri().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  ProductAdditional: Joi.array()
    .items(
      Joi.object({
          id: Joi.number().required(),
          name: Joi.string().required(),
      })
    )
    .required(),
}).unknown();
