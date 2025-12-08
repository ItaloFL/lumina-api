import { Request, Response } from "express";
import { env } from "../../../../env";

export class GenerateGithubAuthUrlController {
  async handle(request: Request, response: Response) {
    const url = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=user`;

    response.redirect(url);
  }
}
