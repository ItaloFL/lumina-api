import { GetUserProfileUseCase } from "../modules/user/get-user-profile/get-user-profile-usecase";
import { PrismaUsersRepository } from "../repositories/user/prisma/prisma-users-repository";

export function MakeUsersProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
