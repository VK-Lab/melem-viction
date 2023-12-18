import { ModuleMetadata } from '@nestjs/common';

export interface IWooCommerceOption {
  baseUrl: string;
  clientKey: string;
  clientSecret: string;
}

export interface ICasperModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<IWooCommerceOption> | IWooCommerceOption;
  inject?: any[];
}
