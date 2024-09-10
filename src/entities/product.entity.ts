import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 32 })
  name!: string;

  @Column({ type: "int", nullable: false, unsigned: true })
  price!: number;

  @Column({ type: "int", nullable: false, unsigned: true })
  vendorId!: number;

  @Column({ type: "smallint", nullable: false, unsigned: true })
  categoryId!: number;
}
