import { Request, Response } from "express";
import { MakeUsersProfileUseCase } from "../../../factories/make-users-profile-use-case";

export class GetUserProfileController {
  async handle(reqeust: Request, response: Response) {
    const { id } = reqeust.user;

    const getUserProfileUseCase = MakeUsersProfileUseCase();

    const user = await getUserProfileUseCase.execute({
      id,
    });

    return response.json(user);
  }
}
