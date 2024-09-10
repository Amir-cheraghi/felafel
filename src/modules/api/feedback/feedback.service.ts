import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ProductEntity } from "../../../entities/product.entity.js";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedbackDAO } from "../../../components/DAO/feedback/feedback.dao.js";
import { AddFeedbacksBodyDTO } from "./feedback.dto.js";
import {
  FeedbackEntity,
  FeedbackTypes,
} from "../../../entities/feedback.entity.js";
import {
  OrderEntity,
  OrderStatusEnum,
} from "../../../entities/order.entity.js";
import { OrderItemEntity } from "../../../entities/order-item.entity.js";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,

    private readonly feedbackDAO: FeedbackDAO,
  ) {}

  async getProductFeedbacks(productId: number) {
    await this.validateProduct(productId);
    return await this.feedbackDAO.getProductFeedbacks(productId);
  }

  async validateProduct(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException("PRODUCT_NOT_FOUND");
    }
  }

  async addFeedback(body: AddFeedbacksBodyDTO, userId: number) {
    const { type, id } = body;
    await this.validateFeedBackableEntity(type, id);
    await this.validateUserPermission(body, userId);
    return await this.createFeedback(body, userId);
  }

  private feedbackModelFactory(type: FeedbackTypes): Repository<any> {
    const repositoryMapper: { [keys in FeedbackTypes]: Repository<any> } = {
      ORDER: this.orderRepository,
      PRODUCT: this.productRepository,
    };
    const model = repositoryMapper[type];

    if (!model) {
      throw new InternalServerErrorException("FEEDBACKABLE_MODEL_NOT_FOUND");
    }

    return model;
  }
  private async validateFeedBackableEntity(
    type: FeedbackTypes,
    id: number,
  ): Promise<void> {
    const feedbackModel = this.feedbackModelFactory(type);

    const query: any = { where: { id } };
    const status = this.feedBackableStatusFactory(feedbackModel);
    if (status) {
      query.where = { ...query.where, ...status };
    }

    const feedBackableEntity = await feedbackModel.findOne(query);

    if (!feedBackableEntity) {
      throw new NotFoundException("FEEDBACKABLE_ENTITY_NOT_FOUND");
    }
  }
  private feedBackableStatusFactory(repository: Repository<any>) {
    switch (repository) {
      case this.orderRepository: {
        return {
          status: In([OrderStatusEnum.Paid, OrderStatusEnum.Delivered]),
        };
      }

      default:
        return undefined;
    }
  }
  private async createFeedback(body: AddFeedbacksBodyDTO, userId: number) {
    const { type, id, rate, comment } = body;
    try {
      return await this.feedbackRepository.insert({
        userId,
        feedBackableId: id,
        feedBackableType: type,
        comment,
        rate: rate * 10,
      });
    } catch (e: any) {
      if (e.code == "ER_DUP_ENTRY") {
        throw new ConflictException("FEEDBACK_ALREADY_REGISTERED");
      }
      throw new InternalServerErrorException(e);
    }
  }

  private async validateUserPermission(
    body: AddFeedbacksBodyDTO,
    userId: number,
  ) {
    const { type, id, orderId } = body;
    // FIXME: This method must be more dynamic based and easily validate other permissions

    if (type == FeedbackTypes.Product) {
      const orderItem = await this.orderItemRepository.query(
        "SELECT t1.orderId , t1.productId , t2.userId from `order-items` as t1 LEFT JOIN orders as t2 on t1.orderId = t2.id where t1.orderId = ? AND t1.productId = ? and t2.userId = ?",
        [orderId, id, userId],
      );

      if (!orderItem.length) {
        throw new ForbiddenException("FEEDBACK_NOT_AUTHORIZED");
      }
    } else if (type == FeedbackTypes.Order) {
      const order = await this.orderRepository.findOne({
        where: {
          id,
          userId,
          status: In([OrderStatusEnum.Paid, OrderStatusEnum.Delivered]),
        },
      });

      if (!order) {
        throw new ForbiddenException("FEEDBACK_NOT_AUTHORIZED");
      }
    }
  }
}
