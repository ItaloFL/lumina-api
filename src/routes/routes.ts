import { Router } from "express";
import { CreateUserController } from "../modules/user/create-user/create-user-controller";
import { AuthenticateUserController } from "../modules/user/authenticate-user/authenticate-user-controller";
import { upload } from "../config/upload";
import { GenerateGithubAuthUrlController } from "../modules/auth/github/generate-github-auth-url/generate-github-auth-url-controller";
import { GenerateGoogleAuthUrlController } from "../modules/auth/google/generate-google-auth-url/generate-google-auth-url-controller";
import { AuthenticateWithGoogleController } from "../modules/auth/google/authenticate-with-google/authenticate-with-google-controller";
import { AuthenticateWithGithubController } from "../modules/auth/github/authenticate-with-github/authenticate-with-github-controller";
import { GetUserProfileController } from "../modules/user/get-user-profile/get-user-profile-controller";
import { ensureAuthenticateUserMiddleware } from "../middleware/ensureAuthenticateUserMiddleware";
import { UpdateUserProfileController } from "../modules/user/update-user-profile/update-user-profile-controller";
import { UserLogoutController } from "../modules/auth/logout/user-logout-controller";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const generateGoogleAuthUrlController = new GenerateGoogleAuthUrlController();
const authenticateWithGoogleController = new AuthenticateWithGoogleController();
const generateGithubController = new GenerateGithubAuthUrlController();
const authenticateWithGithubController = new AuthenticateWithGithubController();
const getUserProfileController = new GetUserProfileController();
const updateUserProfileController = new UpdateUserProfileController();
const userLogoutController = new UserLogoutController();
const routes = Router();

routes.post("/user", upload.single("image"), createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.get("/google", generateGoogleAuthUrlController.handle);
routes.get("/auth/google/callback", authenticateWithGoogleController.handle);
routes.get("/github", generateGithubController.handle);
routes.get("/auth/github/callback", authenticateWithGithubController.handle);
routes.get(
  "/profile",
  ensureAuthenticateUserMiddleware,
  getUserProfileController.handle
);
routes.put(
  "/profile/update",
  ensureAuthenticateUserMiddleware,
  upload.single("image"),
  updateUserProfileController.handle
);
routes.post("/logout", userLogoutController.handle);

export { routes };
