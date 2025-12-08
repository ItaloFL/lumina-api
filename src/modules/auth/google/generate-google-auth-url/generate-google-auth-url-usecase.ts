import { oAuth2Client } from "../../../../lib/google-auth";

export class GenerateGoogleAuthUrlUseCase {
  async execute() {
    const url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["email", "profile"],
    });

    return url;
  }
}
