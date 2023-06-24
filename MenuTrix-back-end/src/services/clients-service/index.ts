import { conflictError } from '@/errors';
import clientsRepository from '@/repositories/clients-repository';
import restaurantsRepository from '@/repositories/restaurants-repository';
import { CreateClientSystemType } from '@/schemas';

async function getAllClients(userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const clients = await clientsRepository.getAllClients(restaurant.id);
  return clients;
}

async function createClient(body: CreateClientSystemType, userId: number) {
  const restaurant = await restaurantsRepository.getRestaurantById(userId);
  if (!restaurant) throw conflictError();

  const emailExist = await clientsRepository.getClientByEmail(body.email);
  if (emailExist) throw conflictError();

  const client = await clientsRepository.createClient(body, restaurant.id);
  return client;
}

const clientsService = { getAllClients, createClient };

export default clientsService;
