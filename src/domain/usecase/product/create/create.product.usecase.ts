import ProductFactory from "../../../product/factory/product.factory";
import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import { v4 as uuid } from "uuid";
import {
  InputcreateProductDto,
  OutputcreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputcreateProductDto): Promise<OutputcreateProductDto> {
    const prod = { name: input.name, price: input.price };
    //const product = ProductFactory.createByzizao(input.name, input.price);
    const product = ProductFactory.createByzizao(input.name, input.price);

    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
