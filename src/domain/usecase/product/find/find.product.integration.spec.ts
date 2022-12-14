import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Teste unit product user", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should be able to find a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("123", "Uva roxa", 10.0));
    const usercase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Uva roxa",
      price: 10.0,
    };
    const result = await usercase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = new ProductRepository();
    const usercase = new FindProductUseCase(productRepository);
    const input = {
      id: "123",
    };

    expect(() => {
      return usercase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
