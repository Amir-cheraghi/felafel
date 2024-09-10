import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../../entities/product.entity.js";
import { FeedbackDAOModule } from "../../../components/DAO/feedback/feedback.dao.module.js";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), FeedbackDAOModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
