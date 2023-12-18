import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WooCommerceModule } from '../@core/woocommerce';

import { ClaimService } from './claim.service';
import { Claim, ClaimSchema } from './schemas';

import { ConfigService } from '@/common';

@Module({
  imports: [
    WooCommerceModule.register({
      useFactory: (configService: ConfigService) => {
        return configService.get('woocommerce');
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
  ],
  providers: [ClaimService],
  exports: [ClaimService],
})
export class ClaimModule {}
