import { hash } from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { parse } from "date-fns";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  image_url: string;
  dateOfBirth: Date;
}

export class CreateUserUseCase {
  async execute({
    name,
    email,
    image_url,
    password,
    dateOfBirth,
  }: CreateUserUseCaseRequest) {
    const verifyIfUserExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (verifyIfUserExists) throw new Error("Usuário já existe");

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        image_url,
        dateOfBirth,
      },
    });

    return user;
  }
}
