import { prisma } from "../../../lib/prisma";

interface GetUserProfileUseCaseRequest {
  id: string;
}

export class GetUserProfileUseCase {
  async execute({ id }: GetUserProfileUseCaseRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
}
