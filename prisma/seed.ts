import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SEED_COUNT = 10;

async function main() {
  await prisma.user.deleteMany();

  const uniqueFirstNames: string[] = faker.helpers.uniqueArray(
    faker.person.firstName,
    SEED_COUNT,
  );
  const uniqueLastNames: string[] = faker.helpers.uniqueArray(
    faker.person.firstName,
    SEED_COUNT,
  );

  console.log('Seeding...');

  for (let i = 0; i < SEED_COUNT; i++) {
    await prisma.user.create({
      data: {
        firstName: uniqueFirstNames[i],
        lastName: uniqueLastNames[i],
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
