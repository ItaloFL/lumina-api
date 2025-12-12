import { Prisma, User } from "../../generated/prisma/client";
import { CreateUserUseCaseRequest } from "../../modules/user/create-user/create-user-usecase";

export interface UsersRepository {
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateUser(data: Partial<User>): Promise<User>;
  sendMail(email: string, templateEmail: string): Promise<void>;
}
