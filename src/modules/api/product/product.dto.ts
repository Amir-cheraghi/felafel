import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetProductParamDTO {
  @IsNumberString()
  @IsNotEmpty()
  productId!: number;
}
