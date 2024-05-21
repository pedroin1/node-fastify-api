import { FastifyReply, FastifyRequest } from "fastify";
import ContatoService, {
  CreateContactBean,
  UpdateContactBean,
} from "../service/ContatoService";

export default class ContatoControler {
  async listAllContacts(request: FastifyRequest, response: FastifyReply) {
    const contatoService = new ContatoService();
    response.send(await contatoService.listAll());
  }

  async getContact(request: FastifyRequest, response: FastifyReply) {
    const contatoService = new ContatoService();
    const { id } = request.query as { id: number };
    response.send(await contatoService.findOne(id));
  }

  async createContact(request: FastifyRequest, response: FastifyReply) {
    const contatoService = new ContatoService();
    const requestBody = request.body as CreateContactBean;
    response.send(await contatoService.create(requestBody));
  }

  async updateContact(request: FastifyRequest, response: FastifyReply) {
    const contatoService = new ContatoService();
    const requestBody = request.body as UpdateContactBean;
    response.send(await contatoService.update(requestBody));
  }

  async deleteContact(request: FastifyRequest, response: FastifyReply) {
    const contatoService = new ContatoService();
    const { id } = request.query as { id: number };
    response.send(await contatoService.delete(id));
  }
}
