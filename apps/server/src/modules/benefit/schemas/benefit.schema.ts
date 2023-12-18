import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { BeneiftSourceEnum } from '../enums/benefit-source.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'benefits' })
export class Benefit {
  @Prop({
    required: true,
  })
  public name!: string;

  @Prop()
  public description!: string;

  @Prop()
  public amount!: number;

  @Prop({
    required: true,
    type: String,
    enum: BeneiftSourceEnum,
    default: BeneiftSourceEnum.MANUAL,
  })
  public source!: BeneiftSourceEnum;

  @Prop({
    required: true,
  })
  public createdBy!: Types.ObjectId;

  public _id!: Types.ObjectId;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);

export type BenefitDocument = Benefit & Document;

BenefitSchema.set('toJSON', {
  virtuals: true,
});
