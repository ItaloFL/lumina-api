import { compare } from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { env } from "../../../env";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password?: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: AuthenticateUserUseCaseRequest) {
    const verifyIfUserExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!verifyIfUserExists) throw new Error("Usuário ou senha incorretos");

    const verifyIfPasswordCorrect = await compare(
      password!,
      verifyIfUserExists.password!
    );

    if (!verifyIfPasswordCorrect)
      throw new Error("Usuário ou senha incorretos");

    const token = sign({}, env.JWT_SECRET, {
      subject: verifyIfUserExists.id,
      expiresIn: "1d",
    });

    return token;
  }
}
