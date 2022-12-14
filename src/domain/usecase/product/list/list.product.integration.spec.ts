import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.createByzizao("Melao", 10.0);
const product2 = ProductFactory.createByzizao("Melancia", 20.0);

describe("List Product", () => {
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

  it("should list all products", async () => {
    const repository = new ProductRepository();
    await repository.create(product1);
    await repository.create(product2);
    const useCase = new ListProductUseCase(repository);
    const output = await useCase.execute({});
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
