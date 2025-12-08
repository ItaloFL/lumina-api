import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";

interface Payload {
  sub: string;
}

export function ensureAuthenticateUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies?.token;

  if (!token) {
    return response.status(401).json({ message: "Token não encontrado" });
  }

  try {
    const decoded = verify(token, env.JWT_SECRET) as Payload;

    request.user = {
      id: decoded.sub,
    };

    return next();
  } catch (err) {
    console.error("ERRO NO VERIFY:", err);
    return response.status(401).json({ message: "Token inválido" });
  }
}
