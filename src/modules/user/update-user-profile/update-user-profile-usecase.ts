import { prisma } from "../../../lib/prisma";
import { UsersRepository } from "../../../repositories/user/users-repository";

interface UpdateUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  dateOfBirth: Date;
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    id,
    name,
    email,
    image_url,
    dateOfBirth,
  }: UpdateUserUseCaseRequest) {
    const verifyIfUserExist = await this.usersRepository.findByEmail(email);

    if (!verifyIfUserExist) throw new Error("Usuário não encontrado");

    const updatedUser = await this.usersRepository.updateUser({
      id,
      name,
      email,
      dateOfBirth,
      image_url,
    });

    return updatedUser;
  }
}
