import { google } from "googleapis";
import { oAuth2Client } from "../../../../lib/google-auth";
import { prisma } from "../../../../lib/prisma";
import { sign } from "jsonwebtoken";

export class AuthenticateWithGoogleUseCase {
  async execute(code: string) {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2("v2");
    const { data } = await oauth2.userinfo.get({
      auth: oAuth2Client,
    });

    const email = data?.email!;
    const name = data?.name!;
    const avatar = data?.picture!;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          provider: "GOOGLE",
          image_url: avatar,
        },
      });
    }

    const token = sign({ id: user?.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return token;
  }
}
