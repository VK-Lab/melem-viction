
import { Inject, Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';

import { ICreateCouponParams, ICreateCouponResponse, IWooCommerceOption } from '../interfaces';
import { CONFIG_CONNECTION_OPTIONS } from '../constants';



@Injectable()
export class WooCommerceService {
  private request: Axios;
  constructor(
  @Inject(CONFIG_CONNECTION_OPTIONS)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _options: IWooCommerceOption,
  ) {
    this.request = axios.create({
      baseURL: _options.baseUrl,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${_options.clientKey}:${_options.clientSecret}`).toString('base64')}`,
      },
    });
  }

  public async createCoupon(params: ICreateCouponParams): Promise<ICreateCouponResponse> {
    try {
      const { data } = await this.request.post('/wc/v3/coupons', params);

      console.log('data: ', data);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    } catch (err) {
      console.log('err: ', err);
      throw err;
    }
  }
}
