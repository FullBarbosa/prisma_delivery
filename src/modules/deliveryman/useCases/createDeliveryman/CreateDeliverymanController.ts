import { Request, Response } from "express";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response){
    const createDeliveryman = new CreateDeliverymanUseCase();

    const { username, password } = request.body;
    
    const result = await createDeliveryman.execute({username, password})

    return response.json(result);
  }
}