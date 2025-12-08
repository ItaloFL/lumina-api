import { Request, Response } from "express";
import { UserForgotPasswordSendMailUseCase } from "./user-forgot-password-send-mail-usecase";

export class UserForgotPasswordSendMailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const sendMailForgotPasswordUseCase =
      new UserForgotPasswordSendMailUseCase();

    await sendMailForgotPasswordUseCase.execute({ email });

    return response.json({
      message: "Email de recuperação de senha enviado com sucesso.",
    });
  }
}
