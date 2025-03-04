import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { ContactsService } from "./contacts.service";
import { ContactTypesService } from "./contacstType.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@Controller("contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get("types")
  findAllTypes() {
    return this.contactsService.getContactTypes();
  }

  @Get()
  findAllContacs() {
    return this.contactsService.getContacts();
  }
}
