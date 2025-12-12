import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { env } from "../../../env";
import { PrismaUsersRepository } from "../../../repositories/user/prisma/prisma-users-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password?: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}
  async execute({ email, password }: AuthenticateUserUseCaseRequest) {
    const verifyIfUserExists = await this.usersRepository.findByEmail(email);

    if (!verifyIfUserExists) throw new AppError("Usuário ou senha incorretos");

    const verifyIfPasswordCorrect = await compare(
      password!,
      verifyIfUserExists.password!
    );

    if (!verifyIfPasswordCorrect)
      throw new AppError("Usuário ou senha incorretos");

    const token = sign({}, env.JWT_SECRET, {
      subject: verifyIfUserExists.id,
      expiresIn: "1d",
    });

    return token;
  }
}
