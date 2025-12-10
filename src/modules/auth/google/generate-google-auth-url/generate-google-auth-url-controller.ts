import { Request, Response } from "express";
import { GenerateGoogleAuthUrlUseCase } from "./generate-google-auth-url-usecase";

export class GenerateGoogleAuthUrlController {
  async handle(request: Request, response: Response) {
    const generateGoogleAuthUrlUseCase = new GenerateGoogleAuthUrlUseCase();

    const url = await generateGoogleAuthUrlUseCase.execute();

    return response.redirect(url);
  }
}
