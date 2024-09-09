import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentVariable } from "./env.validation.js";

@Injectable()
export class CustomConfigService {
  constructor(
    private configService: ConfigService<EnvironmentVariable, true>,
  ) {}

  get PORT() {
    return this.configService.get("PORT", { infer: true });
  }
  get REDIS_HOST() {
    return this.configService.get("REDIS_HOST", { infer: true });
  }

  get REDIS_PORT() {
    return this.configService.get("REDIS_PORT", { infer: true });
  }

  get REDIS_DB() {
    return this.configService.get("REDIS_DB", { infer: true });
  }

  get MYSQL_HOST() {
    return this.configService.get("MYSQL_HOST", { infer: true });
  }

  get MYSQL_PORT() {
    return this.configService.get("MYSQL_PORT", { infer: true });
  }
  get MYSQL_USERNAME() {
    return this.configService.get("MYSQL_USERNAME", { infer: true });
  }
  get MYSQL_PASSWORD() {
    return this.configService.get("MYSQL_PASSWORD", { infer: true });
  }

  get MYSQL_DATABASE() {
    return this.configService.get("MYSQL_DATABASE", { infer: true });
  }
}
