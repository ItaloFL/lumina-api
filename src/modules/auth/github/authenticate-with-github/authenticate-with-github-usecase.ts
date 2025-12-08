import { sign } from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";
import { env } from "../../../../env";

export class AuthenticateWithGithubUseCase {
  async execute(code: string) {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("GitHub access token not returned");
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser = await userResponse.json();

    const { name, email, avatar_url } = githubUser;

    if (!email) {
      throw new Error(
        "Seu GitHub não possui e-mail público. Configure um e-mail primário."
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name,
          email,
          provider: "GITHUB",
          image_url: avatar_url,
        },
      });
    }

    const token = sign({ id: user.id }, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "7d",
    });

    return token;
  }
}
