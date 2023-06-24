import { prisma } from '@/config';
import { CreateClientSystemType } from '@/schemas';
import { Address, Client } from '@prisma/client';

type ClientAddress = Pick<Client, 'id' | 'name' | 'email' | 'telephone'> & {
  Address: Omit<Address, 'createdAt' | 'updatedAt' | 'clientId'>[];
};

async function getAllClients(restaurantId: number): Promise<ClientAddress[]> {
  return prisma.client.findMany({
    where: {
      restaurantId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      telephone: true,
      Address: {
        select: {
          id: true,
          street: true,
          numberHouse: true,
          neighborhood: true,
          city: true,
          state: true,
          complement: true,
        },
      },
    },
  });
}

async function getClientByEmail(email: string): Promise<Client> {
  return prisma.client.findFirst({
    where: {
      email,
    },
  });
}

async function createClient(
  data: CreateClientSystemType,
  restaurantId: number
): Promise<ClientAddress> {
  const { name, email, telephone } = data;
  const { street, city, complement, neighborhood, numberHouse, state } = data.Address;
  return prisma.client.create({
    data: {
      name,
      email,
      telephone,
      restaurantId,
      Address: {
        create: {
          street,
          city,
          complement,
          neighborhood: neighborhood || null,
          numberHouse,
          state,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      telephone: true,
      Address: {
        select: {
          id: true,
          street: true,
          numberHouse: true,
          neighborhood: true,
          city: true,
          state: true,
          complement: true,
        },
      },
    },
  });
}

const clientsRepository = { getAllClients, getClientByEmail, createClient };

export default clientsRepository;
