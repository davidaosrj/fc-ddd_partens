import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductDto, FindProductOutputDto } from "./find.product.dto";

export default class FindProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: FindProductDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
