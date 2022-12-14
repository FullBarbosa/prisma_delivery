
import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
interface ICreateCliente {
  username:string;
  password:string;
}

export class CreateClientUseCase {
  async execute({
    password,
    username
  }:ICreateCliente){
    const clientExist = await prisma.clients.findFirst({
      where: {
        username:{
          mode:"insensitive",
        }
      }
    })

    if(clientExist){
      throw new Error("client already exists");
    }
    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data:{
        username,
        password:hashPassword
      }
    })

    return client;
  }
}