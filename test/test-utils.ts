import { sign } from 'jsonwebtoken';
import { prismaClient } from '../src/application/database';
import { toSignToken } from '../src/utils/jwt-utils';

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
export class CustomerTest {
  static async delete(email: string) {
    await prismaClient.customer.deleteMany({
      where: {
        email,
      },
    });
  }
  static async getToken() {
    const user = await prismaClient.customer.findFirst();

    if (!user) {
      throw '';
    }

    const tokenPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };

    const token = toSignToken(tokenPayload);

    return token;
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
  static async getToken() {
    const user = await prismaClient.admin.findFirst({
      where: { role: 'SUPERADMIN' },
    });

    if (!user) {
      throw '';
    }

    const tokenPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
    };

    const token = toSignToken(tokenPayload);

    return token;
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
  static async deleteBefore() {
    await prismaClient.table.deleteMany({
      where: {
        number: 1000,
      },
    });
  }
}

export class MenuTest {
  static async delete(id: number) {
    await prismaClient.menu.deleteMany({
      where: {
        id,
      },
    });
  }
  static async deleteOption(id: number) {
    await prismaClient.menuOption.deleteMany({
      where: {
        id,
      },
    });
  }
  static async deleteOptionItem(id: number) {
    await prismaClient.menuOptionItem.deleteMany({
      where: {
        id,
      },
    });
  }
}
