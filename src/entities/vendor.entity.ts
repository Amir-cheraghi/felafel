import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "vendors" })
export class VendorEntity {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "text", nullable: false })
  address!: string;

  @Column({ type: "int", nullable: false, unsigned: true, width: 10 })
  phoneNumber!: string;

  @Column({ type: "text", nullable: false })
  avatarURL!: string;

  // geo point
  // @Column()
  // location: any;
}
