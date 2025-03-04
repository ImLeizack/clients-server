import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "contactsType" })
export class ContactType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  type: string;

  @Column()
  value: string;

  @Column()
  pattern: string;

  @Column()
  message: string;

  @Column()
  minLength: number;

  @Column()
  maxLength: number;
}
