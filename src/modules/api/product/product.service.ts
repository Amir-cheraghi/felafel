import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductEntity } from "../../../entities/product.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedbackDAO } from "../../../components/DAO/feedback/feedback.dao.js";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly feedbackDAO: FeedbackDAO,
  ) {}
  async getProduct(productId: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException("PRODUCT_NOT_FOUND");
    }

    const productAVGRate =
      await this.feedbackDAO.getProductFeedbackAVGRate(productId);

    return {
      ...product,
      averageRate: productAVGRate,
    };
  }
}
