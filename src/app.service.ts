import { Injectable } from '@nestjs/common';
import { Span, MetricService, TraceService } from 'nestjs-otel';
import { OtelMethodCounter, OtelInstanceCounter } from 'nestjs-otel';
@Injectable()
@OtelInstanceCounter()
export class AppService {
  private value = 0;
  private gauge;

  constructor(
    protected readonly metricService: MetricService,
    private readonly traceService: TraceService,
  ) {
    this.gauge = this.metricService.getObservableGauge(`test-batch-gauge`, {
      description: `test-batch-gauge`,
    });
    if (this.gauge) {
      this.gauge.addCallback((result: any) => {
        return result.observe(this.value, {
          name: `batch`,
        });
      });
    }
  }

  destructor() {
    if (this.gauge)
      this.gauge.removeCallback(() => {
        console.log('ObservableGauge callback removed');
      });
  }

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

  // generate random number in range
  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @Span('custom_span_doBatch')
  doBatch(count: number, delay: number): string {
    this.value = 0;
    (async () => {
      for (let i = 0; i < count; i++) {
        await this.doSingle(i, delay);
      }
      this.value = 0;
    })();
    return 'doBatch';
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // @Span('custom_span_doSingle')
  @Span('custom_span_doSingle', { root: true })
  async doSingle(id: number, delay: number) {
    console.log(`task ${id}`);
    await this.sleep(delay);

    const currentSpan = this.traceService.getSpan();
    currentSpan?.addEvent('event_1');
    currentSpan?.end();

    this.value = this.random(1000, 2000);
    return;
  }
}
