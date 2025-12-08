import { prisma } from "../../../lib/prisma";
import { sendMail } from "../../../services/mail/sendMail";
import { passwordResetTemplate } from "../../../templates/userForgotPassword";
import { createCode } from "../../../utils/create-code";

interface SendMailForgotPasswordUseCaseRequest {
  email: string;
}

export class UserForgotPasswordSendMailUseCase {
  async execute({ email }: SendMailForgotPasswordUseCaseRequest) {
    const verifyIfUserExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!verifyIfUserExists) throw new Error("Usuário não encontrado");

    const code = await createCode();

    const templateEmail = passwordResetTemplate(verifyIfUserExists.name, code);

    await sendMail(
      verifyIfUserExists.email,
      "Redefinição de senha",
      templateEmail
    );

    return { message: "Email enviado com sucesso" };
  }
}
