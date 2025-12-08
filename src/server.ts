import express from "express";
import { routes } from "./routes/routes";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
