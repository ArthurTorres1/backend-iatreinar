import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    console.log("ROTA CHAMADA");
    reply.send({ message: "IATreinar Backend is running!" });
  });
}
