import { Router } from "express";
import { CreateUserController } from "../modules/user/create-user/create-user-controller";
import { AuthenticateUserController } from "../modules/user/authenticate-user/authenticate-user-controller";
import { upload } from "../config/upload";
import { GenerateGoogleAuthUrlController } from "../modules/auth/google/login-google/generate-google-auth-url-controller";
import { AuthenticateWithGoogleController } from "../modules/auth/google/auth-google/authenticate-with-google-controller";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const generateGoogleAuthUrlController = new GenerateGoogleAuthUrlController();
const authenticateWithGoogleController = new AuthenticateWithGoogleController();
const routes = Router();

routes.post("/user", upload.single("image"), createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.get("/google", generateGoogleAuthUrlController.handle);
routes.get("/auth/google/callback", authenticateWithGoogleController.handle);

export { routes };
