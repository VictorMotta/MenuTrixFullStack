import { conflictError, invalidCredentialsError } from '@/errors';
import restaurantsRepository from '@/repositories/restaurants-repository';
import { RestaurantBodyType } from '@/schemas/restaurants-schemas';

async function getRestaurant(userId: number) {
  const response = await restaurantsRepository.getRestaurantConfigInfo(userId);

  const ofTimeHour = response.OpeningHour.map((item) => item.ofTimeHour)[0];
  const ofTimeMinute = response.OpeningHour.map((item) => item.ofTimeMinute)[0];
  const toTimeHour = response.OpeningHour.map((item) => item.toTimeHour)[0];
  const toTimeMinute = response.OpeningHour.map((item) => item.toTimeMinute)[0];

  const result = {
    nameRestaurant: response.name,
    photoProfile: response.photoProfile,
    photoCover: response.photoCover,
    street: response.street,
    neighborhood: response.neighborhood,
    city: response.city,
    state: response.state,
    nameParamSite: response.nameParamSite,
    deliveryOptions: response.RestaurantDeliveryOptions.map((item) => item.DeliveryOptions.name),
    daysWeek: response.OpeningHour.map((item) => item.DaysWeek.name),
    openingHour: {
      ofTimeHour,
      ofTimeMinute,
      toTimeHour,
      toTimeMinute,
    },
  };

  return result;
}

async function createOrUpdateRestaurant(body: RestaurantBodyType, userId: number) {
  if (body.deliveryOptions.length <= 0 || body.daysWeek.length <= 0)
    throw invalidCredentialsError();

  const restaurantId = await restaurantsRepository.createOrUpdateRestaurant(body, userId);
  if (!restaurantId) throw conflictError();

  const response = await restaurantsRepository.getRestaurantConfigInfo(userId);

  const ofTimeHour = response.OpeningHour.map((item) => item.ofTimeHour)[0];
  const ofTimeMinute = response.OpeningHour.map((item) => item.ofTimeMinute)[0];
  const toTimeHour = response.OpeningHour.map((item) => item.toTimeHour)[0];
  const toTimeMinute = response.OpeningHour.map((item) => item.toTimeMinute)[0];

  const result = {
    nameRestaurant: response.name,
    photoProfile: response.photoProfile,
    photoCover: response.photoCover,
    street: response.street,
    neighborhood: response.neighborhood,
    city: response.city,
    state: response.state,
    nameParamSite: response.nameParamSite,
    deliveryOptions: response.RestaurantDeliveryOptions.map((item) => item.DeliveryOptions.name),
    daysWeek: response.OpeningHour.map((item) => item.DaysWeek.name),
    openingHour: {
      ofTimeHour,
      ofTimeMinute,
      toTimeHour,
      toTimeMinute,
    },
  };

  return result;
}

const restaurantsService = { getRestaurant, createOrUpdateRestaurant };

export default restaurantsService;
