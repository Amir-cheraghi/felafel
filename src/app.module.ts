import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "@nestjs-modules/ioredis";
import { FeedbackEntity } from "./entities/feedback.entity.js";
import { CustomConfigModule } from "./components/modules/config/config.module.js";
import { CustomConfigService } from "./components/modules/config/config.service.js";
import { CategoryEntity } from "./entities/category.entity.js";
import { OrderEntity } from "./entities/order.entity.js";
import { OrderItemEntity } from "./entities/order-item.entity.js";
import { ProductEntity } from "./entities/product.entity.js";
import { VendorEntity } from "./entities/vendor.entity.js";
import { ApiModule } from "./modules/api/api.module.js";
import { HealthCheckModule } from "./modules/health-check/health-check.module.js";

@Module({
  imports: [
    CustomConfigModule,
    RedisModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) => {
        return {
          type: "single",
          options: {
            host: configService.REDIS_HOST,
            port: configService.REDIS_PORT,
            db: configService.REDIS_DB,
          },
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) => {
        return {
          type: "mysql",
          host: configService.MYSQL_HOST,
          port: configService.MYSQL_PORT,
          username: configService.MYSQL_USERNAME,
          password: configService.MYSQL_PASSWORD,
          database: configService.MYSQL_DATABASE,
          entities: [
            FeedbackEntity,
            CategoryEntity,
            OrderEntity,
            OrderItemEntity,
            ProductEntity,
            VendorEntity,
          ],
          synchronize: true,
        };
      },
    }),
    HealthCheckModule,
    ApiModule,
  ],
})
export class AppModule {}
