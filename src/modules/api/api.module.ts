import { Module } from "@nestjs/common";
import { ProductModule } from "./product/product.module.js";
import { FeedbackModule } from "./feedback/feedback.module.js";
import { VendorModule } from "./vendor/vendor.module.js";

@Module({
  imports: [ProductModule, FeedbackModule, VendorModule],
})
export class ApiModule {}
