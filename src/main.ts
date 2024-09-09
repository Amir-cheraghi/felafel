import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { VersioningType } from "@nestjs/common";
import helmet from "helmet";
import { I18nValidationPipe } from "nestjs-i18n";
import morgan from "morgan";
import { CustomConfigService } from "./components/modules/config/config.service.js";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet({
      xPoweredBy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "script-src-attr": ["'unsafe-inline'"],
          "script-src": ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );
  app.enableCors({ origin: "*" });

  app.use(
    morgan(function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res)?.split("?")[0],
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(CustomConfigService);

  app.useGlobalPipes(new I18nValidationPipe({ transform: true }));

  app.useBodyParser("raw");

  const PORT = configService.PORT;
  await app.listen(PORT);
}

bootstrap();
