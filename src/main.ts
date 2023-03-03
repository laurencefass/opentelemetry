// import otelSDK from './tracing';
import { startTracing } from './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await startTracing()
    .then(() => console.log('nodeSDK started succesfully'))
    .catch((error: any) => console.log('Error initializing otelSDK', error));

  const app = await NestFactory.create(AppModule);
  await app.listen(9000);
  console.log('app listening on port 9000');
}

bootstrap();
