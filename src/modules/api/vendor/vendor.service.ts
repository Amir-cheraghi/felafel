import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { VendorEntity } from "../../../entities/vendor.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedbackDAO } from "../../../components/DAO/feedback/feedback.dao.js";

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(VendorEntity)
    private readonly vendorRepository: Repository<VendorEntity>,
    private readonly feedbackDAO: FeedbackDAO,
  ) {}

  async getVendor(vendorId: number) {
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundException("VENDOR_NOT_FOUND");
    }

    const vendorAVGRate =
      await this.feedbackDAO.vendorFeedbackAggregator(vendorId);

    return { ...vendor, averageRate: vendorAVGRate };
  }
}
