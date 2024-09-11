import { Controller, Get } from "@nestjs/common";
import { HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { RedisHealthService } from "./redis-health-check.service.js";

@Controller("/felafel/v1/health-check")
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly redis: RedisHealthService,
  ) {}
  @Get()
  check() {
    return this.health.check([
      () => this.db.pingCheck("mysql"),
      () => this.redis.isHealthy("redis"),
    ]);
  }
}
