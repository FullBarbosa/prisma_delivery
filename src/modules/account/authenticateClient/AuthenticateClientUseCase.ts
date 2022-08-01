
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!!!");
    }

    const passwordMatch = await compare(password, client.password);
    if (!passwordMatch) {
      throw new Error("Password invalid!!!");
    }

    const token = sign(
      { username },
      "b3c6110deda7bf1d7275c31780a7a14716302195",
      {
        subject: client.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
