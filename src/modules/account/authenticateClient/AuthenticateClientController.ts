import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateClintUseCase = new AuthenticateClientUseCase();

    const result = await authenticateClintUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}