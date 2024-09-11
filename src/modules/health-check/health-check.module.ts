import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "./health-check.controller.js";
import { RedisHealthService } from "./redis-health-check.service.js";

@Module({
  imports: [TerminusModule.forRoot({ errorLogStyle: "pretty" })],
  providers: [RedisHealthService],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
