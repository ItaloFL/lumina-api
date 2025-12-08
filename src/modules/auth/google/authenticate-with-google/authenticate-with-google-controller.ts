import { Request, Response } from "express";
import { AuthenticateWithGoogleUseCase } from "./authenticate-with-google-usecase";
import { env } from "../../../../env";

export class AuthenticateWithGoogleController {
  async handle(request: Request, response: Response) {
    const code = request.query.code as string;

    const authenticateWithGoogleUseCase = new AuthenticateWithGoogleUseCase();

    const token = await authenticateWithGoogleUseCase.execute(code);

    response.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    response.redirect(`${env.BASE_APP_URL}/dashboard`);
  }
}
