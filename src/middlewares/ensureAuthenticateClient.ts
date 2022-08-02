import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Client not authenticated",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "b3c6110deda7bf1d7275c31780a7a14716302195") as IPayload;
    
    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
