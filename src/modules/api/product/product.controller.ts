import { Controller, Get, Param } from "@nestjs/common";
import { GetProductParamDTO } from "./product.dto.js";
import { ProductService } from "./product.service.js";

@Controller({ path: "/api/product", version: "1" })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/:productId")
  getProduct(@Param() params: GetProductParamDTO) {
    const { productId } = params;
    return this.productService.getProduct(productId);
  }
}
