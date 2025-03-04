import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateContactTypeDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @IsNotEmpty()
  @Matches(/^\/.*\/$/)
  readonly pattern: string;

  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @IsNotEmpty()
  @MinLength(1)
  readonly minLength: number;

  @IsNotEmpty()
  @MaxLength(50)
  readonly maxLength: number;
}
