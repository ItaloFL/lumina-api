import { User } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { CreateUserUseCaseRequest } from "../../../modules/user/create-user/create-user-usecase";
import { sendMail } from "../../../services/mail/sendMail";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async createUser(data: CreateUserUseCaseRequest): Promise<User> {
    const { name, email, password, dateOfBirth, image_url } = data;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        dateOfBirth,
        image_url,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
  async updateUser(data: Partial<User>): Promise<User> {
    const { id, name, email, password, dateOfBirth, image_url } = data;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        dateOfBirth,
        image_url,
      },
    });

    return user;
  }

  async sendMail(email: string, templateEmail: string): Promise<void> {
    await sendMail(email, "Redefinição de senha", templateEmail);
  }
}
