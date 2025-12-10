import { prisma } from "../../../lib/prisma";
import { UsersRepository } from "../../../repositories/user/users-repository";
import { sendMail } from "../../../services/mail/sendMail";
import { passwordResetTemplate } from "../../../templates/userForgotPassword";
import { createCode } from "../../../utils/create-code";

interface SendMailForgotPasswordUseCaseRequest {
  email: string;
}

export class UserForgotPasswordSendMailUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email }: SendMailForgotPasswordUseCaseRequest) {
    const verifyIfUserExists = await this.usersRepository.findByEmail(email);

    if (!verifyIfUserExists) throw new Error("Usuário não encontrado");

    const code = await createCode();

    const templateEmail = passwordResetTemplate(verifyIfUserExists.name, code);

    await this.usersRepository.sendMail(email, templateEmail);

    return { message: "Email enviado com sucesso" };
  }
}
