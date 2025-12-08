import { FastifyRequest, FastifyReply } from "fastify";
import { CreateTrainService } from "../services/CreateTrainService";

export interface DataProps {
  name: string;
  weight: number;
  height: number;
  gender: string;
  age: number;
  level: string;
  objective: string;
}

class CreateTrainController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, age, gender, weight, height, level, objective } =
      request.body as DataProps;

    const createTrainService = new CreateTrainService();
    const train = await createTrainService.execute({
      name,
      weight,
      height,
      gender,
      age,
      level,
      objective,
    });
    reply.send(train);
  }
}

export { CreateTrainController };
