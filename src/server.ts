import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/routes";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppError } from "./errors/AppError/AppError";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://lumina-web-ashen.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.code).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `Server Error, ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
