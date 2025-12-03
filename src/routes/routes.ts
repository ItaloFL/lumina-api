import { Router } from "express";
import { CreateUserController } from "../modules/user/create-user/create-user-controller";
import { AuthenticateUserController } from "../modules/user/authenticate-user/authenticate-user-controller";
import { upload } from "../config/upload";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const routes = Router();

routes.post("/user", upload.single("image_url"), createUserController.handle);
routes.post("/login", authenticateUserController.handle);

export { routes };
