import { prisma } from '@/config';
import { AdditionalType } from '@/schemas/additionals-schemas';
import { Additional } from '@prisma/client';

async function getAllByRestaurantId(restaurantId: number) {
  return prisma.additional.findMany({
    where: { restaurantId },
    orderBy: {
      isAvailable: 'desc',
    },
  });
}

async function getAllAvailableByRestaurantId(restaurantId: number) {
  return prisma.additional.findMany({
    where: { restaurantId, isAvailable: true },
    orderBy: {
      name: 'asc',
    },
  });
}

async function getAdditionalByName(name: string, restaurantId: number) {
  return prisma.additional.findFirst({
    where: {
      AND: [{ name }, { restaurantId }],
    },
  });
}

async function getAdditionalById(id: number, restaurantId: number) {
  return prisma.additional.findFirst({
    where: {
      AND: [{ id }, { restaurantId }],
    },
  });
}

async function getAdditionalsContainsName(name: string, restaurantId: number) {
  return prisma.additional.findMany({
    where: {
      AND: [
        {
          name: {
            contains: name.toLocaleUpperCase(),
          },
        },
        { restaurantId },
      ],
    },
    orderBy: {
      isAvailable: 'desc',
    },
  });
}

async function createAdditional(data: AdditionalType, restaurantId: number): Promise<Additional> {
  return prisma.additional.create({
    data: {
      name: data.nameAdditional.toLocaleUpperCase(),
      price: data.priceAdditional,
      restaurantId,
    },
  });
}

async function alterAvailable(id: number, isAvailable: boolean) {
  return prisma.additional.update({
    where: {
      id,
    },
    data: {
      isAvailable,
    },
  });
}

const additionalsRepository = {
  getAllByRestaurantId,
  getAllAvailableByRestaurantId,
  getAdditionalByName,
  getAdditionalById,
  getAdditionalsContainsName,
  createAdditional,
  alterAvailable,
};

export default additionalsRepository;
