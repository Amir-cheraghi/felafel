import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActivationStatusTypes } from "../types/global.js";

@Entity({ name: "categories" })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: "smallint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", unique: true, length: 32 })
  name!: string;

  @Column({
    type: "enum",
    enum: ActivationStatusTypes,
    default: ActivationStatusTypes.Active,
  })
  status!: ActivationStatusTypes;
}
