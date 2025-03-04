import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client } from "./entities/client.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Contact } from "src/contacts/entities/contact.entity";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async createClient(
    createClientDto: CreateClientDto,
  ): Promise<Client | HttpException> {
    try {
      const isClient = await this.clientRepository.findOne({
        where: { curp: createClientDto.curp },
      });

      if (isClient) {
        return new HttpException("El cliente ya existe", HttpStatus.CONFLICT);
      }

      const { contacts, ...remainingData } = createClientDto;

      const newClient = this.clientRepository.create(remainingData);
      const client = await this.clientRepository.save(newClient);
      const newContacts = contacts.map((contact) =>
        this.contactRepository.create({ ...contact, client }),
      );

      await this.contactRepository.save(newContacts);

      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async getClients() {
    return await this.clientRepository.find({ relations: ["contacts"] });
  }

  async getClient(id: number) {
    const isClient = await this.clientRepository.findOne({
      where: { id },
      relations: ["contacts"],
    });

    if (!isClient)
      return new HttpException("El cliente no existe", HttpStatus.NOT_FOUND);
    return isClient;
  }

  async updateClient(id: number, updateClientDto: UpdateClientDto) {
    //verificar si el cliente existe
    const isClient = await this.clientRepository.findOne({
      where: { id },
      relations: ["contacts"],
    });

    console.log("Cliente: ", isClient);
    //si el cliente no existe se retorna un error
    if (!isClient) {
      return new HttpException("El cliente no existe", HttpStatus.NOT_FOUND);
    }
    //Insertar los nuevos datos del cliente
    const { contacts, ...remainigData } = updateClientDto;

    await this.clientRepository.update(id, remainigData);

    if (contacts) {
      //Verificar los nuevos contactos
      const newContacts = contacts.map((contact) => contact.type);
      console.log(newContacts);

      //Eliminar los contactos existentes
      await this.contactRepository.delete({ client: isClient });

      //Insertar los nuevos contactos
      const newContactsData = contacts.map((contact) =>
        this.contactRepository.create({ ...contact, client: isClient }),
      );

      await this.contactRepository.save(newContactsData);
    }
    return await this.clientRepository.findOne({
      where: { id },
      relations: ["contacts"],
    });
  }

  async remove(id: number) {
    const isClient = await this.clientRepository.findOneBy({ id });
    console.log(isClient);
    if (!isClient) {
      return new HttpException("El cliente no existe", HttpStatus.NOT_FOUND);
    }

    return this.clientRepository.delete({ id });
  }
}
