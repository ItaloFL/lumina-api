import { UserForgotPasswordSendMailUseCase } from "../modules/user/user-forgot-password-send-mail/user-forgot-password-send-mail-usecase";
import { PrismaUsersRepository } from "../repositories/user/prisma/prisma-users-repository";

export function MakeUserForgotPasswordSendMailUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const userForgotPasswordSendMailUseCase =
    new UserForgotPasswordSendMailUseCase(usersRepository);
  return userForgotPasswordSendMailUseCase;
}
