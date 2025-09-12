import { NestFactory } from '@nestjs/core';
import { AppModule } from './feature/main';
import {HttpExceptionFilter, swaggerConfiguration} from "@common/config";

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  swaggerConfiguration.config(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then();
