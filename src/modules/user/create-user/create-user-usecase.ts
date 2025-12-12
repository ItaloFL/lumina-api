import { hash } from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { UsersRepository } from "../../../repositories/user/users-repository";
import { AppError } from "../../../errors/AppError/AppError";

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  image_url: string;
  dateOfBirth: Date;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    image_url,
    password,
    dateOfBirth,
  }: CreateUserUseCaseRequest) {
    const verifyIfUserExists = await this.usersRepository.findByEmail(email);

    if (verifyIfUserExists) throw new AppError("Usuário já existe");

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.createUser({
      name,
      email,
      password: passwordHash,
      image_url,
      provider: "LOCAL",
      dateOfBirth,
    });

    return user;
  }
}
