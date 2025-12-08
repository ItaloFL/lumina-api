import { prisma } from "../../../lib/prisma";

interface UpdateUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  dateOfBirth: Date;
}

export class UpdateUserProfileUseCase {
  async execute({
    id,
    name,
    email,
    image_url,
    dateOfBirth,
  }: UpdateUserUseCaseRequest) {
    const verifyIfUserExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!verifyIfUserExist) throw new Error("Usuário não encontrado");

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        image_url: image_url ?? verifyIfUserExist.image_url,
        dateOfBirth,
      },
    });

    return updatedUser;
  }
}
