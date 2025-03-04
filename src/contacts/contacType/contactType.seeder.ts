import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContactType } from "../entities/contactType.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContactTypeSeeder {
  constructor(
    @InjectRepository(ContactType)
    private readonly typeRespository: Repository<ContactType>,
  ) {}

  async seed() {
    const defaultTypes = [
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
    ];

    for (const type of defaultTypes) {
      const isType = await this.typeRespository.findOne({
        where: { type: type.type },
      });
      if (!isType) {
        console.log(isType);
        await this.typeRespository.save(this.typeRespository.create(type));
      }
    }

    console.log("Seed iniciado correctamente");
  }
}
