import type { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticate-user-usecase";
import { env } from "../../../env";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

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
