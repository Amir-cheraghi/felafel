import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetVendorParamsDTO {
  @IsNumberString()
  @IsNotEmpty()
  vendorId!: number;
}
