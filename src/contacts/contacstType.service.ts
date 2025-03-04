import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContactType } from "./entities/contactType.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContactTypesService implements OnModuleInit {
  constructor(
    @InjectRepository(ContactType)
    private readonly contactRepositoty: Repository<ContactType>,
  ) {}

  async onModuleInit() {
    await this.seedContact();
  }

  private async seedContact() {
    const isContact = await this.contactRepositoty.count();
    if (isContact > 0) return;

    const defaultTypes: ContactType[] = [
      {
        type: "Correo personal",
        value: "Correo personal",
        pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
        message: "Ingrese un correo válido",
        minLength: 10,
        maxLength: 50,
      },
      {
        type: "Correo empresarial",
        value: "Correo empresarial",
        pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
        message: "Ingrese un correo válido",
        minLength: 10,
        maxLength: 50,
      },
      {
        type: "Teléfono personal",
        value: "Teléfono personal",
        pattern: "^\\d{10}$",
        message: "Ingrese número válido",
        minLength: 10,
        maxLength: 10,
      },
      {
        type: "Teléfono empresarial",
        value: "Teléfono empresarial",
        pattern: "^\\d{10}$",
        message: "Ingrese número válido",
        minLength: 10,
        maxLength: 10,
      },
    ].map((type) => this.contactRepositoty.create(type));

    await this.contactRepositoty.save(defaultTypes);
  }

  async getTypes(): Promise<ContactType[]> {
    return await this.contactRepositoty.find();
  }
}
