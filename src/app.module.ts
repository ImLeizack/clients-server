import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ClientsModule } from "./clients/clients.module";
import { Client } from "./clients/entities/client.entity";
import { Contact } from "./contacts/entities/contact.entity";
import { ContactType } from "./contacts/entities/contactType.entity";
import { ContactsModule } from "./contacts/contacts.module";
import { ContactTypeSeeder } from "./contacts/contacType/contactType.seeder";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "w3admin",
      database: process.env.MYSQL_DB || "w3bDB",
      entities: [Client, Contact, ContactType],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([ContactType]),
    ClientsModule,
    ContactsModule,
  ],
  providers: [ContactTypeSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly contacTypeSeeder: ContactTypeSeeder) {}

  async onModuleInit() {
    await this.contacTypeSeeder.seed();
  }
}
