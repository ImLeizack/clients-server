import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
