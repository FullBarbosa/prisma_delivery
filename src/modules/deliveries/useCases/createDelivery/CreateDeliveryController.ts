import { CreateDeliveryUseCase } from "./CreateDeliveryUseCases";
import { Request, Response } from "express";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    
    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const { item_name, id_client } = request.body;
    
    const delivery = await createDeliveryUseCase.execute({
      item_name,
      id_client,
    });
    
    response.json(delivery);
  }
}
