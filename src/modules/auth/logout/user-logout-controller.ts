import { Request, Response } from "express";

export class UserLogoutController {
  async handle(request: Request, response: Response) {
    response.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return response.status(200).json({ message: "Logout realizado" });
  }
}
