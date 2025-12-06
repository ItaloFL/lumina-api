import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../../../user/authenticate-user/authenticate-user-usecase";
import { AuthenticateWithGoogleUseCase } from "./authenticate-with-google-usecase";

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
    response.redirect("http://localhost:5173/dashboard");
  }
}
