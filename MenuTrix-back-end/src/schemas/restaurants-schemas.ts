import Joi from 'joi';

export interface RestaurantBodyType {
  nameRestaurant: string;
  photoProfile: string;
  photoCover: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  nameParamSite: string;
  deliveryOptions: [];
  daysWeek: [];
  openingHour: {
    ofTimeHour: string;
    ofTimeMinute: string;
    toTimeHour: string;
    toTimeMinute: string;
  };
}

const minutes: number[] = Array.from(Array(61).keys());

const hours = Array.from(Array(24).keys());

export const restaurantSchema = Joi.object<RestaurantBodyType>({
  nameRestaurant: Joi.string().required(),
  photoProfile: Joi.string().required(),
  photoCover: Joi.string().required(),
  street: Joi.string().required(),
  neighborhood: Joi.string().required(),
  nameParamSite: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  deliveryOptions: Joi.array()
    .items(Joi.valid('delivery', 'local', 'withdrawal').optional())
    .default([])
    .min(1)
    .unique()
    .required(),
  daysWeek: Joi.array()
    .items(Joi.valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'))
    .default([])
    .min(1)
    .unique()
    .required(),
  openingHour: Joi.object({
    ofTimeHour: Joi.string()
      .valid(...hours.map(String))
      .required(),
    ofTimeMinute: Joi.string()
      .valid(...minutes.map(String))
      .required(),
    toTimeHour: Joi.string()
      .valid(...hours.map(String))
      .required(),
    toTimeMinute: Joi.string()
      .valid(...minutes.map(String))
      .required(),
  }),
});
