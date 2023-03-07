import { Controller, Get, Scope, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ scope: Scope.REQUEST })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('world')
  getWorld(): string {
    return this.appService.getWorld();
  }

  @Get('memory')
  useMemory(): string {
    return this.appService.useMemory();
  }
  @Get('fibonacci/:number')
  doFibonacci(@Param('number') number: number): string {
    return this.appService.doFibonacci(number);
  }

  @Get('batch/:number/:delay')
  doBatch(
    @Param('number') number: number,
    @Param('delay') delay: number,
  ): string {
    return this.appService.doBatch(number, delay);
  }
}
