import { CreateUserUseCase } from "./create-user-usecase";
import { cloudinary } from "../../../config/cloudinary";
import { Request, Response } from "express";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, dateOfBirth } = request.body;
    const image = request.file;
    const image_url = request.file;

    const createUserUseCase = new CreateUserUseCase();

    const base64Image = `data:${
      image!.mimetype
    };base64,${image!.buffer.toString("base64")}`;
    const imageUrl = await cloudinary.uploader.upload(base64Image, {
      folder: "lumina/avatars",
    });

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      image_url: imageUrl.secure_url,
      dateOfBirth: new Date(dateOfBirth),
    });

    return response.json(user);
  }
}
