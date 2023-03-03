import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: 'observable-app',
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
    },
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
