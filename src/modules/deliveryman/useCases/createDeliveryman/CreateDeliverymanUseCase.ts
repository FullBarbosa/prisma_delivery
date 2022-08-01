import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";


interface ICreateDeliverymanUseCase {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliverymanUseCase) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (deliverymanExist) {
      throw new Error("deliveryman already exists");
    }
    const hashPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}
