import { Injectable } from '@nestjs/common';
import {
  MetricService,
  OtelMethodCounter,
  OtelInstanceCounter,
} from 'nestjs-otel';

// const metricService = new MetricService();
// let value = 0;

// // Creates metric instruments
// const counter = metricService.getCounter('my-first-counter', {
//   description: 'Example of a Counter',
// });

// const upDownCounter = metricService.getUpDownCounter(
//   'my-first-up-down-counter',
//   {
//     description: 'Example of a UpDownCounter',
//   },
// );

// const attributes = { pid: process.pid, environment: 'staging' };

// const gauge = metricService.getObservableGauge('observable_requests', {
//   description: 'Example of an ObservableGauge',
// });

// gauge.addCallback((observableResult) => {
//   observableResult.observe(value, attributes);
// });

// const observableCounter = metricService.getObservableCounter(
//   'observable_requests',
//   {
//     description: 'Example of an ObservableCounter',
//   },
// );

// observableCounter.addCallback((observableResult) => {
//   observableResult.observe(value, attributes);
// });

// // Record metrics
// setInterval(() => {
//   console.log('value', value);
//   value++;
//   counter.add(1, attributes);
//   upDownCounter.add(Math.random() > 0.5 ? 1 : -1, attributes);
// }, 1000);

@Injectable()
@OtelInstanceCounter()
export class AppService {
  @OtelMethodCounter()
  getHello(): string {
    return 'Hello!';
  }

  @OtelMethodCounter()
  getWorld(): string {
    return 'World!';
  }
}
