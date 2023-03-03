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

  @OtelMethodCounter()
  @Span('fibonacci')
  doFibonacci(n: number): string {
    function* fibonacci(n = 0, current = 0, next = 1): any {
      if (n === 0) {
        return current;
      }
      const m = n !== 0 ? n - 1 : 0;
      yield current;
      yield* fibonacci(m, next, current + next);
    }
    const [...first10] = fibonacci(n);
    return first10.join(', ');
  }

  @OtelMethodCounter()
  @Span('memory')
  useMemory(): string {
    const x = [];
    for (let i = 0; i < 5000000; i++) {
      x.push(i);
    }
    return x.join(', ');
  }
}
