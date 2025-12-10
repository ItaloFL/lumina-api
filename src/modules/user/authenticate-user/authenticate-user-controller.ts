import type { Request, Response } from "express";
import { MakeAuthenticateUserUseCase } from "../../../factories/make-authenticate-user-use-case";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = MakeAuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    response.send();
  }
}
