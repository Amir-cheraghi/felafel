import { Global, Module } from "@nestjs/common";
import { getEnvFile, validate } from "./env.validation.js";
import { ConfigModule } from "@nestjs/config";
import { CustomConfigService } from "./config.service.js";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFile(),
      isGlobal: false,
      cache: true,
      validate,
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
