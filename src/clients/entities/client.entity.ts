import { Contact } from "src/contacts/entities/contact.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clients" })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  birthday: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  nationality: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  gender: string;

  @Column({ unique: true, type: "varchar", length: 18, nullable: false })
  curp: string;

  @OneToMany(() => Contact, (contact) => contact.client, {
    cascade: true,
    onDelete: "CASCADE",
  })
  contacts: Contact[];
}
