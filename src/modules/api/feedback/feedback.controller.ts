import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  AddFeedbacksBodyDTO,
  GetProductFeedbacksParamsDTO,
} from "./feedback.dto.js";
import { FeedbackService } from "./feedback.service.js";
import { UserId } from "../../../components/decorators/userid.decorator.js";

@Controller({ path: "/api/feedback", version: "1" })
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get("/product/:productId")
  async getProductFeedback(@Param() params: GetProductFeedbacksParamsDTO) {
    const { productId } = params;
    return this.feedbackService.getProductFeedbacks(productId);
  }

  @Post("/")
  async addFeedback(
    @Body() body: AddFeedbacksBodyDTO,
    @UserId() userId: number,
  ) {
    await this.feedbackService.addFeedback(body, userId);
  }
}
