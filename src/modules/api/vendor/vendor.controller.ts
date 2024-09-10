import { Controller, Get, Param } from "@nestjs/common";
import { VendorService } from "./vendor.service.js";
import { GetVendorParamsDTO } from "./vendor.dto.js";

@Controller({ path: "/api/vendor", version: "1" })
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get("/:vendorId")
  async getVendor(@Param() params: GetVendorParamsDTO) {
    const { vendorId } = params;
    return this.vendorService.getVendor(vendorId);
  }
}
