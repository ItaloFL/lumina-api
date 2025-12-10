import { cloudinary } from "../../../config/cloudinary";
import { Request, Response } from "express";
import { MakeCreateUserUseCase } from "../../../factories/make-create-user-use-case";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, dateOfBirth } = request.body;
    const image = request.file;

    const createUserUseCase = MakeCreateUserUseCase();

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
