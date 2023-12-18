import { DynamicModule, Module } from '@nestjs/common';

import { CONFIG_CONNECTION_OPTIONS } from './constants';
import { ICasperModuleAsyncOptions } from './interfaces';
import { WooCommerceService } from './services';


@Module({})
export class WooCommerceModule {
  public static register(options: ICasperModuleAsyncOptions): DynamicModule {
    return {
      module: WooCommerceModule,
      providers: [
        {
          provide: CONFIG_CONNECTION_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        WooCommerceService,
      ],
      exports: [WooCommerceService],
    };
  }
}
