import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from "class-validator";
import { FeedbackTypes } from "../../../entities/feedback.entity.js";
import { Transform } from "class-transformer";

export class GetProductFeedbacksParamsDTO {
  @IsNumberString()
  @IsNotEmpty()
  productId!: number;
}

export class AddFeedbacksBodyDTO {
  @IsString()
  @IsEnum(FeedbackTypes)
  @IsNotEmpty()
  type!: FeedbackTypes;

  @IsNumber()
  @IsNotEmpty()
  @Transform((params) => +params.value)
  id!: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  rate!: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @ValidateIf((object) => object.type == FeedbackTypes.Product)
  @IsNumber()
  @IsNotEmpty()
  @Transform((params) => +params.value)
  orderId!: number;
}
