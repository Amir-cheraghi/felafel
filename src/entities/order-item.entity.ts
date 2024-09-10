import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "order-items" })
export class OrderItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", nullable: false, unsigned: true })
  orderId!: number;

  @Column({ type: "int", nullable: false, unsigned: true })
  productId!: number;

  @Column({ type: "int", nullable: false, unsigned: true })
  price!: number;
}
