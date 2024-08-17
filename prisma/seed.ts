import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const password = await hash('Superadmin', 10);
  const superadmin = await prisma.admin.upsert({
    where: { email: 'superadmin@yopmail.com', phoneNumber: '6285151152323' },
    update: {
      firstName: 'superadmin',
      lastName: 'superadmin',
      phoneNumber: '6285151152323',
      email: 'superadmin@yopmail.com',
      role: 'SUPERADMIN',
      password,
    },
    create: {
      firstName: 'superadmin',
      lastName: 'superadmin',
      phoneNumber: '6285151152323',
      email: 'superadmin@yopmail.com',
      role: 'SUPERADMIN',
      password,
    },
  });

  console.log({ superadmin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
