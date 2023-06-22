import { AdditionalType } from '@/schemas/additionals-schemas';
import { conflictError, invalidCredentialsError } from '@/errors';
import additionalsRepository from '@/repositories/additionals-repository';
import restaurantsRepository from '@/repositories/restaurants-repository';
import { notFoundError } from '@/errors/not-found-error';

async function getAllAdditionals(userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const additionals = await additionalsRepository.getAllByRestaurantId(restaurant.id);
  return additionals;
}

async function getAllAdditionalsAvailable(userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const additionals = await additionalsRepository.getAllAvailableByRestaurantId(restaurant.id);
  return additionals;
}

async function createAdditional(body: AdditionalType, userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const additionalExist = await additionalsRepository.getAdditionalByName(
    body.nameAdditional.toLocaleUpperCase(),
    restaurant.id
  );
  if (additionalExist) throw conflictError();

  const createAdditional = await additionalsRepository.createAdditional(body, restaurant.id);
  return createAdditional;
}

async function availableAdditional(isAvailable: boolean, idAdditional: number, userId: number) {
  if (typeof idAdditional !== 'number' || Number.isNaN(idAdditional)) throw conflictError();

  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const additionalExist = await additionalsRepository.getAdditionalById(
    idAdditional,
    restaurant.id
  );
  if (!additionalExist) throw notFoundError();

  if (additionalExist.isAvailable === isAvailable) throw conflictError();

  const additional = await additionalsRepository.alterAvailable(idAdditional, isAvailable);
  return additional;
}

async function getAdditionalsByName(name: string, userId: number) {
  if (!name) throw notFoundError();

  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const additionals = await additionalsRepository.getAdditionalsContainsName(name, restaurant.id);
  return additionals;
}

const additionalsService = {
  getAllAdditionals,
  getAllAdditionalsAvailable,
  createAdditional,
  availableAdditional,
  getAdditionalsByName,
};

export default additionalsService;
