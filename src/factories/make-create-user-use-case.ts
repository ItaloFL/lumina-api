import { CreateUserUseCase } from "../modules/user/create-user/create-user-usecase";
import { PrismaUsersRepository } from "../repositories/user/prisma/prisma-users-repository";

export function MakeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
