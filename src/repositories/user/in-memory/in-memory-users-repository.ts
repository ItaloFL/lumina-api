import { randomUUID } from "node:crypto";
import { Prisma, User } from "../../../generated/prisma/client";
import { CreateUserUseCaseRequest } from "../../../modules/user/create-user/create-user-usecase";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRespository implements UsersRepository {
  users: User[] = [];

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password ?? null,
      dateOfBirth: data.dateOfBirth ?? null,
      image_url: data.image_url ?? null,
      provider: data.provider ?? "LOCAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async updateUser(data: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async sendMail(email: string, templateEmail: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
