import { Request, Response } from "express";
import { UpdateUserProfileUseCase } from "./update-user-profile-usecase";
import { cloudinary } from "../../../config/cloudinary";

export class UpdateUserProfileController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { name, email, dateOfBirth } = request.body;
    const image = request.file;

    const updatedUserProfileUseCase = new UpdateUserProfileUseCase();

    let imageUrl: string | undefined = undefined;

    if (image) {
      const base64Image = `data:${
        image.mimetype
      };base64,${image.buffer.toString("base64")}`;
      const uploaded = await cloudinary.uploader.upload(base64Image, {
        folder: "lumina/avatars",
      });

      imageUrl = uploaded.secure_url;
    }

    const updatedUser = await updatedUserProfileUseCase.execute({
      id,
      name,
      email,
      dateOfBirth,
      image_url: imageUrl,
    });

    return response.json(updatedUser);
  }
}
