import { Request, Response } from "express";

export class UserLogoutController {
  async handle(request: Request, response: Response) {
    response.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return response.status(200).json({ message: "Logout realizado" });
  }
}
