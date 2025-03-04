import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.getClients();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientsService.getClient(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    console.log("Se recibe: ", updateClientDto);
    return this.clientsService.updateClient(+id, updateClientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    console.log("Se recibe: ", id);
    return this.clientsService.remove(+id);
  }
}
