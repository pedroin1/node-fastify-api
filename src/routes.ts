import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import ContatoControler from "./controller/ContatoController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const contatoController = new ContatoControler();

  fastify.get(
    "/listarContatos",
    async (request: FastifyRequest, response: FastifyReply) => {
      return contatoController.listAllContacts(request, response);
    }
  );

  fastify.get(
    "/detalheContato",
    async (request: FastifyRequest, response: FastifyReply) => {
      return contatoController.getContact(request, response);
    }
  );

  fastify.post(
    "/criarContato",
    async (request: FastifyRequest, response: FastifyReply) => {
      return contatoController.createContact(request, response);
    }
  );

  fastify.put(
    "/atualizarContato",
    async (request: FastifyRequest, response: FastifyReply) => {
      return contatoController.updateContact(request, response);
    }
  );

  fastify.delete(
    "/removerContato",
    async (request: FastifyRequest, response: FastifyReply) => {
      return contatoController.deleteContact(request, response);
    }
  );
}
