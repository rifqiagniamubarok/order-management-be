import { prismaClient } from '../src/application/database';

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }
}

export class AdminTest {
  static async delete() {
    await prismaClient.admin.deleteMany({
      where: {
        email: 'testadmin@yopmail.com',
      },
    });
  }
}
export class SuperadminTest {
  static async delete() {
    await prismaClient.admin.deleteMany({
      where: {
        email: 'testsuperadmin@yopmail.com',
      },
    });
  }
}

export class TableTest {
  static async delete() {
    await prismaClient.table.deleteMany({
      where: {
        number: 1,
      },
    });
  }
}
