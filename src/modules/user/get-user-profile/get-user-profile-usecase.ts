import { UsersRepository } from "../../../repositories/user/users-repository";

interface GetUserProfileUseCaseRequest {
  id: string;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ id }: GetUserProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}
