import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export enum FeedbackTypes {
  Product = "PRODUCT",
  // Delivery = "ORDER",
  Order = "ORDER",
}

@Entity({ name: "feedbacks" })
@Index(["feedBackableType", "feedBackableId", "userId"], {
  unique: true,
})
@Index(["feedBackableType", "feedBackableId"])
export class FeedbackEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({
    type: "enum",
    nullable: false,
    enum: Object.values(FeedbackTypes),
  })
  feedBackableType!: FeedbackTypes;

  @Column({ type: "bigint", nullable: false, unsigned: true })
  feedBackableId!: number;

  @Column({ type: "tinyint", nullable: false })
  rate!: number;

  @Column({ type: "text", nullable: true })
  comment!: string;

  @Column({ type: "int", nullable: false })
  userId!: number;
}
