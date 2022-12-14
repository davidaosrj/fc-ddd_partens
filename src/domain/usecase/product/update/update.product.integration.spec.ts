import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createByzizao("Melao", 10.0);

const input = {
  id: product.id,
  name: "Melancia",
  price: 20.0,
};

describe("Update product unit test", () => {
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

  afterEach(async () => {
    await sequelize.close();
  });
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);
    // const result = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
