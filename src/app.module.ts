import { join } from "node:path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "@nestjs-modules/ioredis";
import { FeedbackRepository } from "./repositories/feedback.repository.js";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { CustomConfigModule } from "./components/modules/config/config.module.js";
import { CustomConfigService } from "./components/modules/config/config.service.js";

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
          entities: [FeedbackRepository],
        };
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: "fa",
      loaderOptions: {
        path: join(process.cwd(), "locales"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
      ],
    }),
  ],
})
export class AppModule {}
