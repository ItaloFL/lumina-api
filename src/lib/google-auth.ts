import { OAuth2Client } from "google-auth-library";
import { env } from "../env";

export const oAuth2Client = new OAuth2Client({
  client_id: env.GOOGLE_CLIENT_ID,
  client_secret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${env.BASE_API_URL}/auth/google/callback`,
});
