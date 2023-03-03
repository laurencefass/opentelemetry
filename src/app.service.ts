import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-otel';
import { OtelMethodCounter, OtelInstanceCounter } from 'nestjs-otel';

@Injectable()
@OtelInstanceCounter()
export class AppService {
  @OtelMethodCounter()
  @Span('Hello')
  getHello(): string {
    return 'Hello!';
  }

  @OtelMethodCounter()
  @Span('World')
  getWorld(): string {
    return 'World!';
  }
}
