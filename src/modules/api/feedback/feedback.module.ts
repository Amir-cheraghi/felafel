import { Module } from "@nestjs/common";
import { FeedbackService } from "./feedback.service.js";
import { FeedbackController } from "./feedback.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../../entities/product.entity.js";
import { FeedbackDAOModule } from "../../../components/DAO/feedback/feedback.dao.module.js";
import { OrderEntity } from "../../../entities/order.entity.js";
import { FeedbackEntity } from "../../../entities/feedback.entity.js";
import { OrderItemEntity } from "../../../entities/order-item.entity.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      OrderEntity,
      FeedbackEntity,
      OrderItemEntity,
    ]),
    FeedbackDAOModule,
  ],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
