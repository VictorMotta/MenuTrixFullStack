import { prisma } from '@/config';
import { conflictError } from '@/errors';
import { RestaurantBodyType } from '@/schemas';
import { Restaurant } from '@prisma/client';

async function getRestaurantById(userId: number): Promise<Restaurant> {
  return await prisma.restaurant.findFirst({
    where: {
      userId,
    },
  });
}

async function createOrUpdateRestaurant(data: RestaurantBodyType, userId: number): Promise<number> {
  return await prisma.$transaction(async (prisma): Promise<number> => {
    const dataDays = data.daysWeek;
    const dataOptions = data.deliveryOptions;
    let nameParamSiteWithoutSpaces = data.nameParamSite.toLocaleLowerCase();

    if (/\s/.test(data.nameParamSite)) {
      nameParamSiteWithoutSpaces = data.nameParamSite.replace(/\s/g, '').toLocaleLowerCase();
    }

    const daysWeekDb = await prisma.daysWeek.findMany({});
    const deliveryOptionsDb = await prisma.deliveryOptions.findMany({});
    let listDaysWeek: { [name: string]: { id: number; name: string } } = {};
    let listDeliveryOptions: { [name: string]: { id: number; name: string } } = {};

    for (let i = 0; i < daysWeekDb.length; i++) {
      listDaysWeek[daysWeekDb[i].name] = { id: daysWeekDb[i].id, name: daysWeekDb[i].name };
    }
    for (let j = 0; j < deliveryOptionsDb.length; j++) {
      listDeliveryOptions[deliveryOptionsDb[j].name] = {
        id: deliveryOptionsDb[j].id,
        name: deliveryOptionsDb[j].name,
      };
    }

    const restaurant = await prisma.restaurant.upsert({
      where: {
        userId,
      },
      create: {
        name: data.nameRestaurant,
        photoProfile: data.photoProfile,
        photoCover: data.photoCover,
        street: data.street,
        neighborhood: data.neighborhood,
        nameParamSite: nameParamSiteWithoutSpaces,
        city: data.city,
        state: data.state,
        userId,
      },
      update: {
        name: data.nameRestaurant,
        photoProfile: data.photoProfile,
        photoCover: data.photoCover,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
    });

    const existOpeningHourDeleteAll = await prisma.openingHour.findFirst({
      where: {
        restaurantId: restaurant.id,
      },
    });
    if (existOpeningHourDeleteAll) {
      await prisma.openingHour.deleteMany({
        where: {
          restaurantId: restaurant.id,
        },
      });
    }

    for (let k = 0; k < dataDays.length; k++) {
      if (listDaysWeek[dataDays[k]]) {
        const openingHour = await prisma.openingHour.create({
          data: {
            ofTimeHour: data.openingHour.ofTimeHour,
            ofTimeMinute: data.openingHour.ofTimeMinute,
            toTimeHour: data.openingHour.toTimeHour,
            toTimeMinute: data.openingHour.toTimeMinute,
            Restaurant: {
              connect: { id: restaurant.id },
            },
            DaysWeek: {
              connect: { id: listDaysWeek[dataDays[k]].id },
            },
          },
        });
        if (!openingHour) throw conflictError();
      }
    }

    const existDeliveryOptionsDelete = await prisma.restaurantDeliveryOptions.deleteMany({
      where: {
        restaurantId: restaurant.id,
      },
    });

    if (existDeliveryOptionsDelete) {
      await prisma.restaurantDeliveryOptions.deleteMany({
        where: {
          restaurantId: restaurant.id,
        },
      });
    }
    for (let l = 0; l < dataOptions.length; l++) {
      await prisma.restaurantDeliveryOptions.create({
        data: {
          Restaurant: {
            connect: {
              id: restaurant.id,
            },
          },
          DeliveryOptions: {
            connect: {
              id: listDeliveryOptions[dataOptions[l]].id,
            },
          },
        },
      });
    }

    return restaurant.id;
  });
}

async function getRestaurantConfigInfo(userId: number) {
  return await prisma.restaurant.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      photoProfile: true,
      photoCover: true,
      street: true,
      neighborhood: true,
      nameParamSite: true,
      city: true,
      state: true,
      OpeningHour: {
        select: {
          id: true,
          ofTimeHour: true,
          ofTimeMinute: true,
          toTimeHour: true,
          toTimeMinute: true,
          DaysWeek: {
            select: {
              name: true,
            },
          },
        },
      },
      RestaurantDeliveryOptions: {
        select: {
          id: true,
          DeliveryOptions: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

const restaurantsRepository = {
  getRestaurantById,
  createOrUpdateRestaurant,
  getRestaurantConfigInfo,
};

export default restaurantsRepository;
