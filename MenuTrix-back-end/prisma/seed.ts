import { DaysWeek, DeliveryOptions, MeatPoint, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  let daysWeek: DaysWeek | null | DaysWeek[] = await prisma.daysWeek.findFirst();
  let deliveryOptionals: DeliveryOptions | null | DeliveryOptions[] =
    await prisma.deliveryOptions.findFirst();
  let meatPoint: MeatPoint | null | MeatPoint[] = await prisma.meatPoint.findFirst();
  if (!daysWeek) {
    await prisma.daysWeek.createMany({
      data: [
        {
          name: 'sunday',
        },
        {
          name: 'monday',
        },
        {
          name: 'tuesday',
        },
        {
          name: 'wednesday',
        },
        {
          name: 'thursday',
        },
        {
          name: 'friday',
        },
        {
          name: 'saturday',
        },
      ],
    });
  }
  if (!deliveryOptionals) {
    await prisma.deliveryOptions.createMany({
      data: [
        {
          name: 'delivery',
        },
        {
          name: 'withdrawal',
        },
        {
          name: 'local',
        },
      ],
    });
  }
  if (!meatPoint) {
    await prisma.meatPoint.createMany({
      data: [
        {
          name: 'Mal_Passado',
        },
        {
          name: 'Ao_Ponto',
        },
        {
          name: 'Bem_Passado',
        },
      ],
    });
  }
  daysWeek = await prisma.daysWeek.findMany({});
  deliveryOptionals = await prisma.deliveryOptions.findMany({});
  meatPoint = await prisma.meatPoint.findMany({});

  console.log(daysWeek);
  console.log(deliveryOptionals);
  console.log(meatPoint);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
