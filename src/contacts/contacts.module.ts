import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ContactsService } from "./contacts.service";
import { ContactsController } from "./contacts.controller";
import { Contact } from "./entities/contact.entity";
import { ContactType } from "./entities/contactType.entity";
import { Client } from "src/clients/entities/client.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Client, Contact, ContactType])],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [TypeOrmModule]
})
export class ContactsModule {}
