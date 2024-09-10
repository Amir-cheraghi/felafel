import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {
  FeedbackEntity,
  FeedbackTypes,
} from "../../../entities/feedback.entity.js";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FeedbackDAO {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async getProductFeedbackAVGRate(productId: number) {
    const result = await this.feedbackRepository.query(
      "SELECT ROUND(AVG(rate / 10) , 1) as rate FROM feedbacks WHERE feedBackableId = ? AND feedBackableType = ?",
      [productId, FeedbackTypes.Product],
    );

    return +result[0].rate || 0;
  }

  async getProductFeedbacks(productId: number) {
    return this.feedbackRepository.query(
      "SELECT ROUND(rate / 10, 1) as rate , comment , userId  FROM feedbacks WHERE feedBackableId = ? AND feedBackableType = ?",
      [productId, FeedbackTypes.Product],
    );
  }

  async vendorFeedbackAggregator(vendorId: number) {
    const vendorOrdersQuery = "SELECT id FROM orders WHERE vendorId = ?";
    const vendorProductsQuery = "SELECT id FROM products WHERE vendorId = ?";

    const mainQuery = `SELECT ROUND(AVG(rate / 10) , 1) as rate FROM feedbacks WHERE (feedBackableType = ? AND feedBackableId IN (${vendorProductsQuery}) ) OR (feedBackableType = ? AND feedBackableId IN (${vendorOrdersQuery}))`;
    const parameters = [
      FeedbackTypes.Product,
      vendorId,
      FeedbackTypes.Order,
      vendorId,
    ];

    const result = await this.feedbackRepository.query(mainQuery, parameters);

    return +result[0].rate || 0;
  }
}
