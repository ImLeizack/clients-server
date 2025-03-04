import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Contact } from "./entities/contact.entity";
import { ContactType } from "./entities/contactType.entity";

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(ContactType)
    private readonly typeRepository: Repository<ContactType>,
  ) {}

  async getContacts() {
    return await this.contactsRepository.find();
  }

  async getContactTypes() {
    return await this.typeRepository.find();
  }
}
