import { AuthenticateUserUseCase } from "../modules/user/authenticate-user/authenticate-user-usecase";
import { PrismaUsersRepository } from "../repositories/user/prisma/prisma-users-repository";

export function MakeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

  return authenticateUserUseCase;
}
