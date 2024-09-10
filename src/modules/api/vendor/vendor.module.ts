import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorEntity } from "../../../entities/vendor.entity.js";
import { FeedbackDAOModule } from "../../../components/DAO/feedback/feedback.dao.module.js";
import { VendorController } from "./vendor.controller.js";
import { VendorService } from "./vendor.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([VendorEntity]), FeedbackDAOModule],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
