import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from "class-validator";

export const Environment = {
  dev: "dev",
  stage: "stage",
  prod: "prod",
} as const;

export class EnvironmentVariable {
  @IsNumber()
  @Min(3000)
  @IsNotEmpty()
  PORT!: number;

  @IsEnum(Environment)
  NODE_ENV: keyof typeof Environment = Environment.dev;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT!: number;

  @IsNumber()
  @Min(0)
  @Max(14)
  @IsNotEmpty()
  REDIS_DB!: number;

  @IsString()
  @IsNotEmpty()
  MYSQL_HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  MYSQL_PORT!: number;

  @IsString()
  @IsNotEmpty()
  MYSQL_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_DATABASE!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export function getEnvFile() {
  const nodeEnv = process.env.NODE_ENV as keyof typeof Environment;
  console.info(`Environment has been set to: ${nodeEnv}`);

  const validEnvs = Object.values(Environment);
  if (!nodeEnv || !validEnvs.includes(nodeEnv)) {
    throw new Error(
      // prettier-ignore
      `Invalid environment. Expected ${validEnvs.join(", ")} but got ${nodeEnv}`,
    );
  }

  return `.env.${nodeEnv}`;
}
