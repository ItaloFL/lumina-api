import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRespository } from "../../../repositories/user/in-memory/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user-usecase";
import { CreateUserUseCase } from "../create-user/create-user-usecase";

let usersRepository: InMemoryUsersRespository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate a User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute({
      name: "User Test",
      email: "test@test.com",
      password: "test@123",
      dateOfBirth: new Date("2000-01-01"),
      image_url: "http://example.com/image.jpg",
    });

    const token = await authenticateUserUseCase.execute({
      email: "test@test.com",
      password: "test@123",
    });

    expect(token).not.toBeNull();
    expect(token).toEqual(expect.any(String));
  });
});
