export interface ICreateCouponParams {
  code: string;
  discount_type: string;
  amount: string;
  individual_use?: true;
  exclude_sale_items?: true;
  minimum_amount?: string;
}
