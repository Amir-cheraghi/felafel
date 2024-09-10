import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatusEnum {
  Canceled = "CANCELED",
  Failed = "FAILED",
  InProgress = "IN_PROGRESS",
  Paid = "PAID",
  Delivered = "DELIVERED",
}

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "int", nullable: false, unsigned: true })
  vendorId!: number;

  @Column({
    type: "enum",
    enum: OrderStatusEnum,
    nullable: false,
    default: OrderStatusEnum.InProgress,
  })
  status!: OrderStatusEnum;

  @Column({ type: "int", nullable: false, default: 0, unsigned: true })
  deliveryPrice!: number;

  @Column({ type: "int", nullable: false, default: 0, unsigned: true })
  tax!: number;

  @Column({ type: "int", nullable: false, default: 0, unsigned: true })
  servicesPrice!: number;

  @Column({ type: "int", nullable: false })
  userId!: number;
}
