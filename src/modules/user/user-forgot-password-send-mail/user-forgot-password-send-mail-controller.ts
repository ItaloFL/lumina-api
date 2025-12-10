import { Request, Response } from "express";
import { MakeUserForgotPasswordSendMailUseCase } from "../../../factories/make-user-forgot-password-send-mail-use-case";

export class UserForgotPasswordSendMailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const sendMailForgotPasswordUseCase =
      MakeUserForgotPasswordSendMailUseCase();

    await sendMailForgotPasswordUseCase.execute({ email });

    return response.json({
      message: "Email de recuperação de senha enviado com sucesso.",
    });
  }
}
