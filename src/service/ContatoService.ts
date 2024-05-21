import prismaClient from "../prisma";

export type UpdateContactBean = {
  id: number;
  nome: string;
  telefone: string;
};

export type CreateContactBean = {
  nome: string;
  telefone: string;
};

export default class ContatoService {
  async listAll() {
    return await getAllContacts();
  }

  async findOne(id: number) {
    validateContactId(id);
    return await getContactById(id);
  }

  async create({ nome, telefone }: CreateContactBean) {
    validateContactData({ nome, telefone });
    return await createContact(nome, telefone);
  }

  async update({ id, nome, telefone }: UpdateContactBean) {
    validateContactData({ id, nome, telefone });
    return await updateContact(id, nome, telefone);
  }

  async delete(id: number) {
    validateContactId(id);
    return await deleteContact(id);
  }
}

async function getAllContacts() {
  try {
    const data = await prismaClient.tb_contatos.findMany();
    return data.map(({ id, nome, telefone }) => ({
      id: id.toString(),
      nome: nome,
      telefone: telefone,
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar contatos`);
  }
}

async function getContactById(id: number) {
  try {
    const data = await prismaClient.tb_contatos.findUnique({
      where: { id },
    });

    if (!data) {
      throw new Error("Contato não encontrado");
    }

    return {
      id: data.id.toString(),
      nome: data.nome,
      telefone: data.telefone,
    };
  } catch (error) {
    throw new Error(`Contato com id ${id} não existe`);
  }
}

async function createContact(nome: string, telefone: string) {
  try {
    const contato = await prismaClient.tb_contatos.create({
      data: { nome, telefone },
    });

    return { contato: `Contato criado de id: ${contato.id}` };
  } catch (error) {
    throw new Error(`Erro ao criar contato`);
  }
}

async function updateContact(id: number, nome: string, telefone: string) {
  try {
    const contato = await prismaClient.tb_contatos.update({
      where: { id },
      data: { nome, telefone },
    });

    return { contato: `Contato atualizado de id: ${contato.id}` };
  } catch (error) {
    throw new Error(`Erro ao atualizar contato`);
  }
}

async function deleteContact(id: number) {
  try {
    const contato = await prismaClient.tb_contatos.delete({
      where: { id },
    });

    return { contato: `Contato removido de id: ${contato.id}` };
  } catch (error) {
    throw new Error(`Erro ao remover contato`);
  }
}

function validateContactData({
  id,
  nome,
  telefone,
}: Partial<UpdateContactBean>) {
  if (id !== undefined && !id) throw new Error("Id é obrigatório");
  if (!nome) throw new Error("Nome é obrigatório");
  if (!telefone) throw new Error("Telefone é obrigatório");
}

function validateContactId(id: number) {
  if (!id) throw new Error("Id é obrigatório");
}
