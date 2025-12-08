import { Request, Response } from "express";
import { GetUserProfileUseCase } from "./get-user-profile-usecase";

export class GetUserProfileController {
  async handle(reqeust: Request, response: Response) {
    const { id } = reqeust.user;

    const getUserProfileUseCase = new GetUserProfileUseCase();

    const user = await getUserProfileUseCase.execute({
      id,
    });

    return response.json(user);
  }
}
