import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ContractNameEnum } from '../enums/contract-name.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'nft_collections' })
export class NftCollection {
  @Prop({
    trim: true,
  })
  public name!: string;

  @Prop({
    trim: true,
  })
  public description!: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  })
  public tokenAddress!: string;

  @Prop({
    required: true,
    unique: true,
  })
  public uid!: string;

  @Prop()
  public defaultImageUrl?: string;

  @Prop({
    required: true,
  })
  public contractType!: string;

  @Prop({
    type: String,
    default: ContractNameEnum.PUBLIC,
    enum: ContractNameEnum,
  })
  public contractName!: ContractNameEnum;

  @Prop({})
  public campaignId?: Types.ObjectId;

  @Prop({
    required: true,
  })
  public chainId!: string;

  @Prop()
  public createdBy?: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    default: [],
    ref: 'Benefit',
  })
  public benefitIds!: Types.ObjectId[];

  public _id!: Types.ObjectId;
}

export const NftCollectionSchema = SchemaFactory.createForClass(NftCollection);

export type NftCollectionDocument = NftCollection & Document;

NftCollectionSchema.set('toJSON', {
  virtuals: true,
});

NftCollectionSchema.virtual('benefits', {
  ref: 'Benefit',
  localField: 'benefitIds',
  foreignField: '_id',
});
