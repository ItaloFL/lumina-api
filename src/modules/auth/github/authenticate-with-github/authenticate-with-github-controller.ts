import { Request, Response } from "express";
import { AuthenticateWithGithubUseCase } from "./authenticate-with-github-usecase";
import { env } from "../../../../env";

export class AuthenticateWithGithubController {
  async handle(request: Request, response: Response) {
    const { code } = request.query;

    const useCase = new AuthenticateWithGithubUseCase();
    const token = await useCase.execute(String(code));

    response.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    response.redirect(`${env.BASE_APP_URL}/dashboard`);
  }
}
