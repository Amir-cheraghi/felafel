import { Injectable } from "@nestjs/common";
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { Redis } from "ioredis";

@Injectable()
export class RedisHealthService extends HealthIndicator {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = await this.redis.ping();
    // check it up or down
    const result = this.getStatus(key, !!isHealthy);
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError("Redis failed", result);
  }
}
