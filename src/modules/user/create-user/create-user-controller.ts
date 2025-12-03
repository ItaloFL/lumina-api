import type { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-usecase";
import { cloudinary } from "../../../config/cloudinary";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, dateOfBirth } = request.body;
    const image = request.file;

    const createUserUseCase = new CreateUserUseCase();

    const base64Image = `data:${
      image!.mimetype
    };base64,${image!.buffer.toString("base64")}`;
    const image_url = await cloudinary.uploader.upload(base64Image, {
      folder: "lumina/avatars",
    });

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      image_url: image_url.secure_url,
      dateOfBirth: new Date(dateOfBirth),
    });

    return response.json(user);
  }
}
