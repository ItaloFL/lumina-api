import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRespository } from "../../../repositories/user/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile-usecase";
import { CreateUserUseCase } from "../create-user/create-user-usecase";

let usersRepository: InMemoryUsersRespository;
let createUserUseCase: CreateUserUseCase;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile by id", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "test@test.com",
      password: "test@123",
      dateOfBirth: new Date("2000-01-01"),
      image_url: "http://example.com/image.jpg",
    });

    const userProfile = await getUserProfileUseCase.execute({
      id: user.id,
    });

    expect(userProfile).toHaveProperty("id");
  });
});
