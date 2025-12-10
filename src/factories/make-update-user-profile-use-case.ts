import { UpdateUserProfileUseCase } from "../modules/user/update-user-profile/update-user-profile-usecase";
import { PrismaUsersRepository } from "../repositories/user/prisma/prisma-users-repository";

export function MakeUpdateUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateUsersProfileUseCase = new UpdateUserProfileUseCase(
    usersRepository
  );

  return updateUsersProfileUseCase;
}
