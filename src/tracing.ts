import { Span } from '@opentelemetry/api';
import { ExportResult } from '@opentelemetry/core';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Resource } from '@opentelemetry/resources';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

export const monitoringAttributes: Record<string, string> = {
  [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'opentelemetry',
  [SemanticResourceAttributes.SERVICE_NAME]: 'observable_app',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
    process.env.NODE_ENV ?? 'production',
};

export async function startTracing() {
  try {
    // https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/exporter-trace-otlp-grpc
    const traceExporter = new OTLPTraceExporter({
      // grpc (no path)
      timeoutMillis: 30000,
      url: 'http://opentelemetry:4317',
      // http (include path)
      // url: 'http://opentelemetry:4318/v1/traces',
    });

    // https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-exporter-metrics-otlp-grpc
    const metricExporter = new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        // grpc (no path)
        url: 'http://opentelemetry:4317',
        // http (include path)
        // url: 'http://opentelemetry:4318/v1/metrics',
      }),
      exportIntervalMillis: 10,
    });

    const sdk = new NodeSDK({
      resource: new Resource(monitoringAttributes),
      traceExporter: traceExporter,
      metricReader: metricExporter,
      spanProcessor: new BatchSpanProcessor(traceExporter, {
        scheduledDelayMillis: 10,
      }),
      instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
      ],
    });

    await sdk
      .start()
      .then(() => console.log('Tracing initialized'))
      .catch((error) => console.log('Error initializing tracing', error));

    // gracefully shut down the SDK on process exit
    process.on('SIGTERM', () => {
      sdk
        .shutdown()
        .then(() => console.log('Tracing terminated'))
        .catch((error) => console.log('Error terminating tracing', error))
        .finally(() => process.exit(0));
    });
  } catch (e) {
    console.log('startTracing. error occurred', e);
  }
}
