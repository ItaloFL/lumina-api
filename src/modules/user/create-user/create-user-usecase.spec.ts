import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryUsersRespository } from "../../../repositories/user/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user-usecase";
import { AppError } from "../../../errors/AppError/AppError";

let usersRepository: InMemoryUsersRespository;
let createUserUseCase: CreateUserUseCase;

describe("Create a new user", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "test@test.com",
      password: "test@123",
      dateOfBirth: new Date("2000-01-01"),
      image_url: "http://example.com/image.jpg",
    });

    expect(user).toHaveProperty("id");
    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to create a new user with same email", async () => {
    await createUserUseCase.execute({
      name: "User Test",
      email: "test@test.com",
      password: "test@123",
      dateOfBirth: new Date("2000-01-01"),
      image_url: "http://example.com/image.jpg",
    });

    await expect(() =>
      createUserUseCase.execute({
        name: "User Test",
        email: "test@test.com",
        password: "test@123",
        dateOfBirth: new Date("2000-01-01"),
        image_url: "http://example.com/image.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
