import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeedbackEntity } from "../../../entities/feedback.entity.js";
import { FeedbackDAO } from "./feedback.dao.js";

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity])],
  providers: [FeedbackDAO],
  exports: [FeedbackDAO],
})
export class FeedbackDAOModule {}
